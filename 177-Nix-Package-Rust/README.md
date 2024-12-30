# Nix: Build and Distribute a Rust Application

The last post explored how to package up a C application and distribute it, so that anyone can pull it onto their NixOS system by simply pasting a blob of code you give them.

In this post, we'll do the same for a Rust application.

## Try it!

If you're using NixOS, paste the following into your `configuration.nix` to try this out!

```
  environment.systemPackages = with pkgs; [
    # ... everything else you have installed
    sample-app-rust
  ];
  nixpkgs.config.packageOverrides = pkgs: {
    sample-app-c =
      let
      defaultNix = builtins.fetchurl {
      url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/177-Nix-Package-Rust/sample-app-rust/default.nix";
        sha256 = "";
      };
    in pkgs.callPackage defaultNix {
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "main";  # REPLACE WITH A TAG!
        sha256 = "";
      } + "/177-Nix-Package-Rust/sample-app-rust";
    };
  };
```

Run `sudo nixos-rebuild switch` and you'll have **my** executable on your system! Run it by typing `sample-app-rust`.


## Quick Demo

If you just want to make something happen with this code in this repo, `cd` to this directory and run these commands:

```bash
# this one builds using the local source:
cd sample-app-rust
nix-build
./result/out/sample-app-rust
# this one pulls in the source from GitHub and builds:
cd ../nixos
nix-build
./result/out/sample-app-rust
```

There's also a dev shell you can play with by running:

```bash
cd sample-app-rust
nix-shell
cargo run
```

Read on to figure out why this is so useful!

## 1. Creating the Rust Application

You know the drill - to create a Rust application, just use `cargo new`:

```bash
nix-shell -p cargo
cargo new sample-app-rust
cd sample-app-rust
cargo run
```

Now let's add a `default.nix` to build the executable:

```nix
{ pkgs ? import <nixpkgs> { }, src ? ./. }:

let theSource = src; in
pkgs.rustPlatform.buildRustPackage rec {
  pname = "sample-app-rust";
  version = "1.0.0";
  src = pkgs.lib.cleanSource "${theSource}";
  cargoLock.lockFile = "${theSource}/Cargo.lock";
}
```

Notice how we defined `src` as an input to the `default.nix` derivation function. This will be important soon!


## 2. Running in NixOS (Local-Only)

As long as this package already exists somewhere on our computer (because we manually wrote it or cloned it into our home area), it's very straightforward to add this to our NixOS system. Just add the package to your `packageOverrides`:

```nix
  nixpkgs.config.packageOverrides = pkgs: {
    sample-app-rust = callPackage /home/steve/repos/education/177-Nix-Package-Rust/sample-app-rust
  };
```

Be sure to replace `/home/steve/repos` with the actual path to this repo! Then, add the package to your system packages:

```nix
  environment.systemPackages = with pkgs; [
    # ... everything else you have installed
    sample-app-rust
  ];
```

If you run `sudo nixos-rebuild switch`, you should be able to run `sample-app-rust` and see the "Hello World" message now.

This is cool, but it would be a lot better if we didn't have to go through the effort of manually cloning this thing down. If someone else wants to use this package, it's so much easier if they can just paste something into their `configuration.nix` file and rebuild (without having to set something special up in their home area). Let's look into how to do that next.


## 3. Testing Using `default.nix`

We don't have to run `sudo nixos-rebuild switch` every time we want to try downloading and installing from GitHub. Instead, I found it to be much easier to define a `default.nix` file and use it to iterate.

Once that's working, you can copy it directly out of that file into your package overrides, and you should be good to go!

We can get started with the example from the previous step. Simply paste the `packageOverrides` snippet over into a new `default.nix`:

```nix
{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-rust = 
    pkgs.callPackage /home/steve/repos/education/177-Nix-Package-C/sample-app-rust { };
  in [
    sample-app-rust
  ]
```

Now, you can run `nix-build` to make sure this works, and if not, tweak it to work! Once this builds, you can be fairly confident that it will also work with your `configuration.nix`. In the next post, we'll see that this allows you to test multiple packages at the same time, too.


## 4. Building from GitHub

Remember the `src` argument to our application's `default.nix`? We'll override that variable here to download the source from GitHub instead of using a local copy.

I renamed `src` to `theSource` because without this, the `src` variable shadows itself and results in an infinite recursion - the good ol' stack overflow error. If you want to see what I mean, try deleting the line that says `let theSource = src; in`.

The previous C app required a `subdir` argument, but somehow, I'm able to get away with just appending to the `fetchFromGitHub` path for Rust. I'm not going to question it!

Let's test it out. Instead of directly updating NixOS, start by changing our test `default.nix` from the previous step to use these new args:

```nix
{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-rust =
    let
    defaultNix = builtins.fetchurl {
      url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/177-Nix-Package-Rust/sample-app-rust/default.nix";
        sha256 = "";
      };
    in pkgs.callPackage defaultNix {
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "main";  # REPLACE WITH A TAG!
        sha256 = "";
      } + "/177-Nix-Package-Rust/sample-app-rust";
    };
  in [
    sample-app-rust
  ]
```

Run this using `nix-build` and fix the hash errors. Once it's working, you should be able to put it directly into your NixOS `configuration.nix` file:

```nix
  environment.systemPackages = with pkgs; [
    # ... everything else you have installed
    sample-app-rust
  ];
  nixpkgs.config.packageOverrides = pkgs: {
    sample-app-rust =
      let
      defaultNix = builtins.fetchurl {
        url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/177-Nix-Package-Rust/sample-app-rust/default.nix";
        sha256 = "";
      };
    in pkgs.callPackage defaultNix {
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "main";  # REPLACE WITH A TAG!
        sha256 = "";
      } + "/177-Nix-Package-Rust/sample-app-rust";
    };
  };
```

Run `sudo nixos-rebuild switch` and your `sample-app-rust` is available, built directly from GitHub!


## Other Lessons Learned

See previous post for all the strange things I learned about debugging while figuring this out.

## Conclusion

This is a jumbled mess of notes, but I hope it was helpful to you! I'm very excited about the possibilities that come with being about to write **and distribute** my own binary applications within the Nix ecosystem, but unfortunately, it was pretty hard to figure out how to do this. Maybe this post will shorten the path for others trying to do the same!

If you enjoyed, consider subscribing to the [PageKey YouTube channel](https://youtube.com/@PageKey) and/or starring this GitHub repo. Thanks!


## Sources

- [Nix Packages - Why Does Nothing Work](https://www.youtube.com/watch?v=CqFcl4BmbN4): This post is heavily based on this video! Thank you to the person who made it. It seems to be the only video on YouTube showing how to do this as of December 2024.
- NixOS forums and other random Google adventures.
- Lots of trial and error.
