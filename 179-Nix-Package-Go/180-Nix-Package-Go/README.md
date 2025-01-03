# Nix: Build and Distribute a Go Application

Wouldn't it be great if, instead of just using the stuff already on Nixpkgs, you could write your own application and use it on NixOS? Better yet, if you can do that, then you can give the same snippet to other people, and they can use your app, too!

This was a lot harder than expected. There doesn't seem to be a huge amount of documentation on how to do this online. I was able to break it down into a few pieces: first, we create the sample Go application with a `default.nix` file. Then, you can run it in NixOS by including it locally. Finally, we use a combination of `fetchurl` and `fetchFromGitHub` to get the package from GitHub. We fill in the SHA-256 hashes along the way to create a fully reproducible build!

I used a commit hash instead of a tag in this example, but for any of your apps, you'll want to create a Git tag for this.

## Try it!

My `sample-app-go` is NOT on nixpkgs, but you can still easily install it on your NixOS system! Just paste the following code into yorustur `configuration.nix` to try it out:

```nix
  environment.systemPackages = with pkgs; [
    # ... everything else you have installed
    sample-app-go
  ];
  nixpkgs.config.packageOverrides = pkgs: {
    sample-app-go = 
      let
        defaultNix = builtins.fetchurl {
        url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/179-Nix-Package-Go/sample-app-go/default.nix";
          sha256 = "sha256:0w1cf4rg5fnjq564am6vdvqvm2ii1fmp9wfdxjkgd01wrmkrsgjk";
        };
      in pkgs.callPackage defaultNix {
        src = pkgs.fetchFromGitHub {
          owner = "pagekey";
          repo = "education";
          rev = "main";
          sha256 = "sha256-b86xXoALmNjmTFtFH4aialYtv0IYkzDhHOHEamI8weM=";
        };
        subdir = "179-Nix-Package-Go/sample-app-go";
      };
  };
```

Run `sudo nixos-rebuild switch` and you'll have **my** executable on your system! Run it by typing `sample-app-go`.


## Quick Demo

If you just want to make something happen with this code in this repo, `cd` to this directory and run these commands:

```bash
cd sample-app-go
nix-build
./result/bin/sample-app-go
cd ../nixos
nix-build
./result/bin/sample-app-go
```

There's also a dev shell you can play with by running:

```bash
cd sample-app-go
nix-shell
```

Read on to figure out why this is so useful!

## 1. Creating the Go Application

Like any other Go app, you can create all the files you need with `go mod init sample-app-go`. After adding a few other important files, we end up with:

```
sample-app-go/
  .gitignore
  default.nix
  go.mod
  main.go
```

Inside `main.go`, let's create a fairly simple Go program that imports uses code from `greetings.go` as well as a third-party package:

```go
package main

import "fmt"
import (
    "github.com/sirupsen/logrus"
)

func main() {
    fmt.Println("Hello, World from Go!")
	logrus.Println("Hello from third-party package!")
    fmt.Println(GetGreeting())
}
```

We can also add `greetings.go`:

```go
package main


func GetGreeting() string {
	return "Hello from another file!"
}
```

The `default.nix` is where things get a little more interesting:

```nix
{ pkgs ? import <nixpkgs> { } }:
pkgs.buildGoModule {
  pname = "sample-app-go";
  version = "1.0.0";

  src = ./.;

  vendorHash = "sha256-TjLx8n7/E0BOhMF1mOSInidXQKZePCkOhReZAiliGRw=";
  proxyVendor = true;
}
```

If you're unfamiliar with Nix, the `default.nix` file we see here defines a **function**. The inputs are `pkgs`, which defaults to the system `nixpkgs` if not overridden.

Thankfully, for Go applications, we can use the `buildGoModule` function built-in to Nixpkgs to handle all the details of the build process.


## 2. Running in NixOS (Local-Only)

As long as this package already exists somewhere on our computer (because we manually wrote it or cloned it into our home area), it's very straightforward to add this to our NixOS system. Just add the package to your `packageOverrides` in `configuration.nix`:

```nix
  nixpkgs.config.packageOverrides = pkgs: {
    sample-app-go = pkgs.callPackage /home/steve/repos/education/179-Nix-Package-Go/sample-app-go/default.nix { };
  };
```

Be sure to replace `/home/steve/repos/education` with the actual path to this repo! Then, add the package to your system packages:

```nix
  environment.systemPackages = with pkgs; [
    # ... everything else you have installed
    sample-app-go
  ];
```

If you run `sudo nixos-rebuild switch`, you should be able to run `sample-app-go` and see the "Hello World" messages now.

This is cool, but it would be a lot better if we didn't have to go through the effort of manually cloning this thing down. If someone else wants to use this package, it's so much easier if they can just paste something into their `configuration.nix` file and rebuild (without having to set something special up in their home area). Let's look into how to 
do that next.


## 3. Testing Using `default.nix`

We don't have to run `sudo nixos-rebuild switch` every time we want to try downloading and installing from GitHub. Instead, I found it to be much easier to define a `default.nix` file and use it to iterate.

Once that's working, you can copy it directly out of that file into your package overrides, and you should be good to go!

We can get started with the example from the previous step. Simply paste the `packageOverrides` snippet over into a new `default.nix`:

```nix
{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-go = 
    pkgs.callPackage /home/steve/repos/education/179-Nix-Package-Go/sample-app-go { };
  in [
    sample-app-go
  ]
```

Now, you can run `nix-build` to make sure this works, and if not, tweak it to work! Once this builds, you can be fairly confident that it will also work with your `configuration.nix`. You can also test installing multiple packages at the same time - just add another package name in the `let` block, and add it's name to the list in the `in` block! It would look like this:

```nix
{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-c = 
      let
          defaultNix = builtins.path {
              path = /home/steve/repos/education/176-Nix-Package-C/sample-app-c;
          };
      in pkgs.callPackage defaultNix {
          src = builtins.path {
              path = /home/steve/repos/education;
          };
          subdir = "176-Nix-Package-C/sample-app-c/src";
      };
    sample-app-go = 
      pkgs.callPackage /home/steve/repos/education/179-Nix-Package-Go/sample-app-go { };
  in [
    sample-app-c
    sample-app-go
  ]
```


## 4. Building from GitHub

We have to upgrade out application's `default.nix` in to add a new argument: `src`.

This argument allows us to override where the source code is coming from. We'll get into that more later, but since we're just doing a local build, `./.` is perfect for now.

I renamed `src` to `theSource` because without this, the `src` variable shadows itself and results in an infinite recursion - the good ol' stack overflow error. If you want to see what I mean, try deleting the line that says `let theSource = src; in`.

The `subdir` argument is something I added because this is nested in the PageKey `education` repo. Most people probably won't need to override this, but if you have a monorepo with tons of applications in it, this may come in handy!

The new `default.nix` will look like this:

```nix
{ pkgs ? import <nixpkgs> { }, src ? ./., subdir ? "" }:
let theSource = src; in
pkgs.buildGoModule {
  pname = "sample-app-go";
  version = "1.0.0";

  src = "${theSource}/${subdir}";

  vendorHash = "sha256-TjLx8n7/E0BOhMF1mOSInidXQKZePCkOhReZAiliGRw=";
  proxyVendor = true;
}
```

Let's test it out. Instead of directly updating NixOS, start by changing our test `default.nix` from the previous step to use these new args:

```nix
{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-go =
    let
      defaultNix = builtins.fetchurl {
        url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/179-Nix-Package-Go/sample-app-go/default.nix";
        sha256 = "";
      };
    in pkgs.callPackage defaultNix {
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "main";  # REPLACE WITH A TAG!
        sha256 = "";
      };
      subdir = "/179-Nix-Package-Go/sample-app-go";
    };
  in [
    sample-app-go
  ]
```

Run this with `nix-build`. If you see a hash mismatch error, that's good! Copy the hash it's expecting and paste it into the blank `sha256 = "";` block. There are two of them, so start at the top and work your way down.

Notice how we're now using the `src` arg that we added as inputs to `sample-app-go/default.nix`.

Just like before, once it's working, you should be able to put it directly into your NixOS `configuration.nix` file:

```nix
  environment.systemPackages = with pkgs; [
    # ... everything else you have installed
    sample-app-go
  ];
  nixpkgs.config.packageOverrides = pkgs: {
    sample-app-go =
      let
        defaultNix = builtins.fetchurl {
          url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/179-Nix-Package-Go/sample-app-go/default.nix";
          sha256 = "";
        };
      in pkgs.callPackage defaultNix {
        src = pkgs.fetchFromGitHub {
          owner = "pagekey";
          repo = "education";
          rev = "main";  # REPLACE WITH A TAG!
          sha256 = "";
        };
        subdir = "/179-Nix-Package-Go/sample-app-go";
      };
  };
```

Run `sudo nixos-rebuild switch` and your `sample-app-go` is available, built directly from GitHub!


## Conclusion

I hope this tutorial was helpful to you! I'm very excited about the possibilities that come with being about to write **and distribute** my own binary applications within the Nix ecosystem, but unfortunately, it was pretty hard to figure out how to do this. Maybe this post will shorten the path for others trying to do the same!

If you enjoyed, consider subscribing to the [PageKey YouTube channel](https://youtube.com/@PageKey) and/or starring this GitHub repo. Thanks!


## Sources

- [Nix Packages - Why Does Nothing Work](https://www.youtube.com/watch?v=CqFcl4BmbN4): This post is heavily based on this video! Thank you to the person who made it. It seems to be the only video on YouTube showing how to do this as of December 2024.
- NixOS forums and other random Google adventures.
- Lots of trial and error.
