# Nix: Build and Distribute a C Application

Wouldn't it be great if, instead of just using the stuff already on Nixpkgs, you could write your own application and use it on NixOS? Better yet, if you can do that, then you can give the same snippet to other people, and they can use your app, too!

This was a lot harder than expected. There doesn't seem to be a huge amount of documentation on how to do this online. I was able to break it down into a few pieces: first, we create the sample C application with a `default.nix` file. Then, you can run it in NixOS by including it locally. Finally, we use a combination of `fetchurl` and `fetchFromGitHub` to get the package from GitHub. We fill in the SHA-256 hashes along the way to create a fully reproducible build!

I used a commit hash instead of a tag in this example, but for any of your apps, you'll want to create a Git tag for this.

## Try it!

If you're using NixOS, paste the following into your `configuration.nix` to try this out!

```
  environment.systemPackages = with pkgs; [
    # ... everything else you have installed
    sample-app-c
  ];
  nixpkgs.config.packageOverrides = pkgs: {
    sample-app-c =
      let
        defaultNix = builtins.fetchurl {
          url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/176-nix-package/sample-app-c/default.nix";
          sha256 = "1h0yvmgdikfjfygd43947fmkmz3awpdjcjlwl5wkirhifw2c9i5d";
        };
      in pkgs.callPackage defaultNix {
        src = pkgs.fetchFromGitHub {
          owner = "pagekey";
          repo = "education";
          rev = "main";  # REPLACE WITH A TAG!
          sha256 = "cGsxEAMhr9Mg4vOlCCrbp1PCjEmgNUk0HkTcjCOOYMk";
        };
        subdir = "176-nix-package/sample-app-c/src";
      };
  };
```

Run `sudo nixos-rebuild switch` and you'll have **my** executable on your system! Run it by typing `sample-app-c`.


## Quick Demo

If you just want to make something happen with this code in this repo, `cd` to this directory and run these commands:

```bash
cd sample-app-c-local
nix-build
./result/out/sample-app-c
cd ../nixos
nix-build
./result/out/sample-app-c
```

There's also a dev shell you can play with by running:

```bash
cd sample-app-c
nix-shell
```

Read on to figure out why this is so useful!

## 1. Creating the C Application

We don't need many files for the C application. Here's what our directory tree looks like:

```
sample-app-c/
  src/
    main.c
  .gitignore
  default.nix
```

Inside `main.c`, you'll find the simplest C program you could ever hope for:

```c
#include <stdio.h>


int main() {
    printf("Hello, world from C!\n");
    return 0;
}
```

The `default.nix` is where things get a little more interesting:

```nix
{ pkgs ? import <nixpkgs> { } }:


pkgs.stdenv.mkDerivation rec {
    pname = "sample-app-c";
    version = "1.0.0";

    src = ./src;

    nativeBuildInputs = [ pkgs.stdenv.cc ];

    buildPhase = ''
        gcc -o ${pname} ${src}/main.c
    '';
    installPhase = ''
        mkdir -p $out/bin
        mv ${pname} $out/bin/
    '';
}
```

If you're unfamiliar with Nix, the file we see here defines a **function**. The inputs are `pkgs`, which defaults to the system `nixpkgs` if not overridden.

As far as the rest of the code goes, it declares some metadata, shows how to use `gcc` to build the executable, and copies the executable to `bin`!


## 2. Running in NixOS (Local-Only)

As long as this package already exists somewhere on our computer (because we manually wrote it or cloned it into our home area), it's very straightforward to add this to our NixOS system. Just add the package to your `packageOverrides`:

```nix
  nixpkgs.config.packageOverrides = pkgs: {
    sample-app-c = callPackage /home/steve/repos/education/176-Nix-Package-C/sample-app-c
  };
```

Be sure to replace `/home/steve/repos` with the actual path to this repo! Then, add the package to your system packages:

```nix
  environment.systemPackages = with pkgs; [
    # ... everything else you have installed
    sample-app-c
  ];
```

If you run `sudo nixos-rebuild switch`, you should be able to run `sample-app-c` and see the "Hello World" message now.

This is cool, but it would be a lot better if we didn't have to go through the effort of manually cloning this thing down. If someone else wants to use this package, it's so much easier if they can just paste something into their `configuration.nix` file and rebuild (without having to set something special up in their home area). Let's look into how to do that next.


## 3. Testing Using `default.nix`

We don't have to run `sudo nixos-rebuild switch` every time we want to try downloading and installing from GitHub. Instead, I found it to be much easier to define a `default.nix` file and use it to iterate.

Once that's working, you can copy it directly out of that file into your package overrides, and you should be good to go!

We can get started with the example from the previous step. Simply paste the `packageOverrides` snippet over into a new `default.nix`:

```nix
{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-c = 
    pkgs.callPackage /home/steve/repos/education/176-Nix-Package-C/sample-app-c-local { };
  in [
    sample-app-c
  ]
```

Now, you can run `nix-build` to make sure this works, and if not, tweak it to work! Once this builds, you can be fairly confident that it will also work with your `configuration.nix`. In the next post, we'll see that this allows you to test multiple packages at the same time, too.


## 4. Building from GitHub

We have to upgrade out application's `default.nix` in to add two new args: `src` and `subdir`.

The `src` argument allows us to override where the source code is coming from. We'll get into that more later, but since we're just doing a local build, `./src` is perfect for now.

I renamed `src` to `theSource` because without this, the `src` variable shadows itself and results in an infinite recursion - the good ol' stack overflow error. If you want to see what I mean, try deleting the line that says `let theSource = src; in`.

The `subdir` argument is something I added because this is nested in the PageKey `education` repo. Most people probably won't need to override this, but if you have a monorepo with tons of C applications in it, this may come in handy!

The new `default.nix` will look like this:

```nix
{ pkgs ? import <nixpkgs> { }, src ? ./src, subdir ? ./. }:


let theSource = src; in
pkgs.stdenv.mkDerivation rec {
    pname = "sample-app-c";
    version = "1.0.0";

    src = theSource;

    nativeBuildInputs = [ pkgs.stdenv.cc ];

    buildPhase = ''
        gcc -o ${pname} ${src}/${subdir}/main.c
    '';
    installPhase = ''
        mkdir -p $out/bin
        mv ${pname} $out/bin/
    '';
}
```

Let's test it out. Instead of directly updating NixOS, start by changing our test `default.nix` from the previous step to use these new args:

```nix
{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-c =
    let
      defaultNix = builtins.fetchurl {
        url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/176-nix-package/sample-app-c/default.nix";
        sha256 = "";
      };
    in pkgs.callPackage defaultNix {
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "main";  # REPLACE WITH A TAG!
        sha256 = "";
      };
      subdir = "176-nix-package/sample-app-c/src";
    };
  in [
    sample-app-c
  ]
```

Notice how we're now using both of the `src` and `subdir` args that we added as inputs to `sample-app-c/default.nix`.

Run this using `nix-build` and fix the hash errors. Once it's working, you should be able to put it directly into your NixOS `configuration.nix` file:

```nix
  environment.systemPackages = with pkgs; [
    # ... everything else you have installed
    sample-app-c
  ];
  nixpkgs.config.packageOverrides = pkgs: {
    sample-app-c =
      let
        defaultNix = builtins.fetchurl {
          url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/176-nix-package/sample-app-c/default.nix";
          sha256 = "";
        };
      in pkgs.callPackage defaultNix {
        src = pkgs.fetchFromGitHub {
          owner = "pagekey";
          repo = "education";
          rev = "main";  # REPLACE WITH A TAG!
          sha256 = "";
        };
        subdir = "176-nix-package/sample-app-c/src";
      };
  };
```

Run `sudo nixos-rebuild switch` and your `sample-app-c` is available, built directly from GitHub!


## Other Lessons Learned

While the `default.nix` method of testing ended up working best for me in this case, I also discovered `nix repl`. You can run this and paste in code snippets to see how they work:

```bash
pkgs = import <nixpkgs>{}
(paste snippet here)
```

This really helped me build an intuition for what the output types of all these functions we're running are. I was able to see what evaluated to a string, what ended up as a derivation, and what generated a lambda. Unfortunately, it seemed there was no good way to invoke a `deriv` once you had it assigned to a variable, so I had to use the `default.nix` method described above.

Another important "gotcha" is to remember that Nix does everything it can to **cache requests**! This means that if you're making lots of little changes trying to get something to work, you may end up pulling your hair out because nothing seems to be changing. This was especially the case when I started experimenting with `fetchurl` and `fetchFromGitHub`.

To get around caching, you need to take two steps. First, add a query parameter to the end of the url to make it different - something like `?something=else`. Second, delete the hash and leave it blank. This will force an error where it tells you the latest hash, and you can copy and paste it into the file. Even when I did this, it still sometimes took a few tries before GitHub would serve the latest file I just pushed - this must have something to do with caching on their end. Here's what it should look like when you're trying to clear the cache:

```nix
url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/176-nix-package/sample-app-c/default.nix?abc=def";
sha256 = "";
```

Thankfully, this is probably not needed very often - it may even be a special case for this post, when I'm trying to figure out how to use those external fetches properly! If you use proper tagging in your repo, there may be no need for this.


## Conclusion

This is a jumbled mess of notes, but I hope it was helpful to you! I'm very excited about the possibilities that come with being about to write **and distribute** my own binary applications within the Nix ecosystem, but unfortunately, it was pretty hard to figure out how to do this. Maybe this post will shorten the path for others trying to do the same!

If you enjoyed, consider subscribing to the [PageKey YouTube channel](https://youtube.com/@PageKey) and/or starring this GitHub repo. Thanks!


## Sources

- [Nix Packages - Why Does Nothing Work](https://www.youtube.com/watch?v=CqFcl4BmbN4): This post is heavily based on this video! Thank you to the person who made it. It seems to be the only video on YouTube showing how to do this as of December 2024.
- NixOS forums and other random Google adventures.
- Tons of trial and error.
