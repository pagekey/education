# Nix Debugging Strategies

Here are a few Nix debugging strategies that I wanted to share. These came in handy while developing the previous videos about how to package up applications with Nix. I started that series as a complete novice to Nix, and thanks to the tips I discovered below, I feel much more comfortable reading and debugging Nix code now.


## 1. `nix repl`

You can run `nix repl` to start a "read, evaluate, print loop" session. This enables you to paste in Nix code and see exactly what each statement returns. This was huge for me personally - it helped me build an intuition for what's actually happening in all the code above. For example, try running the following in `nix repl`:

```bash
pkgs = import <nixpkgs>{}
defaultNix = builtins.fetchurl {
  url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/176-Nix-Package-C/sample-app-c/default.nix";
  sha256 = "sha256:05357l33rllpyw2479rb0i06mi18aqm3dn20hrywmi3zi0a6q6a1";
}
pkgs.callPackage defaultNix
pkgs.callPackage defaultNix { }
```

Notice how when you run `callPackage` without the curly braces, it returns a lambda! Then, when you actually run it, you should see that it outputs a `derivation`.

From what I could tell, there's no easy way to invoke that `derivation` object once you have it in the REPL, which led me to my next debugging strategy.


## 2. Using `default.nix`

The above snippets helped a ton when debugging the `fetchurl` function call. But once I had that `derivation` object, I had to evaluate it to know if there were any build errors. The most obvious way to do this is to paste it into your NixOS `configuration.nix` and see if it builds, but this is overkill - there's no need to modify your entire operating system config just to test out this little package!

Instead, we can create a new directory called `nixos` and simulate whether it works on NixOS! Create a single file in that directory called `default.nix`. Now, copy whatever you put in the REPL above that evaluated to a derivation, put it in this file, and save it. The only small change is that you have to make it a function that accepts `pkgs` as an input, so put `{ pkgs ? import <nixpkgs> { } }:` at the top. Another tweak is that the function can only have one expression, which is what gets returned. To get around this, you can define as many variables as you want in a `let`/`in` block:

```nix
{ pkgs ? import <nixpkgs> { } }:
let
  defaultNix = builtins.fetchurl {
    url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/176-Nix-Package-C/sample-app-c/default.nix";
    sha256 = "sha256:05357l33rllpyw2479rb0i06mi18aqm3dn20hrywmi3zi0a6q6a1";
  };
  buildPackageLambda = pkgs.callPackage defaultNix;
  theBuiltPackage = buildPackageLambda { };
in
  theBuildPackage
```

Note that this build fails because we kept it simple by not specifying the GitHub source code location. For our purposes, this is good enough - you can now see that the derivation was evaluated, and we got some useful debug info from it!


## 3. Clearing Cache with Surgical Precision

A huge issue I ran into while figuring out how to build source code directly from GitHub was **caching**. Nix loves caching, and we should love it too! It's the thing that lets us install Firefox in seconds instead of hours and hours to build every single dependency from scratch.

However, sometimes we need to get around caching. When you're changing a remote file often because you're debugging, it's really annoying if an old version gets stuck in cache. Thankfully, there are some steps we can take to get around this.

All we have to do to get around this is to figure out the Nix Store path for whatever is cached, and (carefully) delete it. If a build is failling on a file, you can usually just check the log to figure out which one. You should be able to see which entry in the store is referenced somewhere.

However, if you're still having trouble, you can run a command in `nix repl` to see which store entry it returns:

```bash
$ nix repl
nix-repl> builtins.fetchurl {
                url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/178-Nix-Package-Python/sample-app-python/default.nix";
                  sha256 = "sha256:0mhjp9ig4g4wahkkrncpq5bc3f6bcnkg5qpa54dsyp0r3s669hbz";
                } 
"/nix/store/4sn1xmgw01xz3w0ln0f3qwacm6yilidf-default.nix"
```

As you can see, it prints out the location of where the downloaded file was stored! 

Now that we know which entry in the store holds the cached version of that file, we just need to delete it with the `nix-store --delete` command.

```bash
nix-store --delete /nix/store/4sn1xmgw01xz3w0ln0f3qwacm6yilidf-default.nix
```

After you run this, you should see `1 store paths deleted, 0.00 MiB freed`.

A few other notable commands for working with the cache include:

- `nix-collect-garbage`: This deletes everything in the Nix Store that is not used by an installed program.
- `rm -rf ~/.cache/nix`: Use at your own risk! This clears your user cache, but you shouldn't have to use this if you apply the above commands properly.
