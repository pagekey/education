# Nix: Build and Distribute a Python Application

Wouldn't it be great if, instead of just using the stuff already on Nixpkgs, you could write your own application and use it on NixOS? Better yet, if you can do that, then you can give the same snippet to other people, and they can use your app, too!

Python is interesting because you have to find a way to make sure the right **environment** is present, with all the packages you need to run your application. In addition to fetching the source code with `fetchurl` and `fetchFromGitHub`, we need to package up the Python interpreter and packages (environment) as a Nix derivation.

As a bonus, we also package the code up as a valid Python package so that, instead of having a single script, we can import from multiple files within our package.

I used a commit hash instead of a tag in this example, but for any of your apps, you'll want to create a Git tag for this.

## Try it!

My `sample-app-python` is NOT on nixpkgs, but you can still easily install it on your NixOS system! Just paste the following code into your `configuration.nix` to try it out:

```nix
  environment.systemPackages = with pkgs; [
    # ... everything else you have installed
    sample-app-python
  ];
  nixpkgs.config.packageOverrides = pkgs: {
    sample-app-python = 
        let
            defaultNix = builtins.fetchurl {
                url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/178-Nix-Package-Python/sample-app-python/default.nix";
                    sha256 = "sha256:0mhjp9ig4g4wahkkrncpq5bc3f6bcnkg5qpa54dsyp0r3s669hbz";
            };
        in pkgs.callPackage defaultNix {
            src = pkgs.fetchFromGitHub {
                owner = "pagekey";
                repo = "education";
                rev = "main";  # REPLACE WITH A TAG!
                sha256 = "sha256-y6JHx9hFB7nGPhD9GYC0AjQXAI2qoUnbi7t3ms7p924=";
            };
            subdir = "178-Nix-Package-Python/sample-app-python";
        };
  };
```

Run `sudo nixos-rebuild switch` and you'll have **my** executable on your system! Run it by typing `sample-app-python`.


## Quick Demo

If you just want to make something happen with this code in this repo, `cd` to this directory and run these commands:

```bash
cd sample-app-python
nix-build
./result/bin/sample-app-python
cd ../nixos
nix-build
./result/bin/sample-app-python
```

There's also a dev shell you can play with by running:

```bash
cd sample-app-python
nix-shell
```

Read on to figure out why this is so useful!

## 1. Creating the Python Application (Env, Package, App)

Let's create a valid Python package to hold our application. Here's what our directory tree looks like:

```
sample-app-python/
  src/
    sample_app_python/
        __init__.py
        main.py
        other.py
  .gitignore
  default.nix
  setup.py
```

Inside `main.py`, you'll find a simple Flask web server, which demonstrate that we can import third-party packages **and** use imports within our own package:

```python
from flask import Flask
from sample_app_python.other import some_var

app = Flask(__name__)

@app.route('/')
def hello_world():
    return "Hello world from Nix and Flask!"

if __name__ == "__main__":
    print(f"Imported: {some_var}")
    app.run(debug=True)
```

The `default.nix` is where things get interesting:

```nix
{ pkgs ? import <nixpkgs> { }, src ? ./., subdir ? "" }:

let
  theSource = src;
  pythonPackage = pkgs.python311Packages.buildPythonPackage {
    pname = "sample-app-python-package";
    version = "1.0.0";

    src = "${theSource}/${subdir}";

    buildInputs = [ pkgs.python311Packages.setuptools pkgs.python311Packages.wheel ];
    propagatedBuildInputs = [ pkgs.python311Packages.flask ];

    meta = {
      description = "My Python package with Flask";
      license = pkgs.lib.licenses.mit;
    };
  };
  pythonEnv = pkgs.python311.buildEnv.override {
    extraLibs = [ pkgs.python311Packages.flask pythonPackage ];
    ignoreCollisions = true;
  };
in
pkgs.stdenv.mkDerivation rec {
  name = "sample-app-python";

  propagatedBuildInputs = [ pythonEnv ];

  src = "${theSource}/${subdir}/src";

  installPhase = ''
    mkdir -p $out/bin
    cat > $out/bin/${name} <<EOF
#!/bin/sh
exec ${pythonEnv}/bin/python3 ${src}/sample_app_python/main.py "\$@"
EOF
    chmod +x $out/bin/${name}
  '';

  meta = with pkgs.lib; {
    description = "A Python application with Flask and main executable";
    license = licenses.mit;
  };
}
```

There's a lot going on here. First, we're passing `src` and `subdir` into the function with defaults so that we can override them later with the source code we download from GitHub. Also, you'll notice that in the `installPhase`, we're creating a shell script to run `main.py`. This allows us to use the same format as compiled applications such as C or Rust - just a simple executable to run when you're ready to use the application, rather than having to mess around with which script to run, which interpreter to use, and all those other annoying Python-specific details.


## 2. Running in NixOS (Local-Only)

As long as this package already exists somewhere on our computer (because we manually wrote it or cloned it into our home area), it's very straightforward to add this to our NixOS system. Just add the package to your `packageOverrides` in `configuration.nix`:

```nix
  nixpkgs.config.packageOverrides = pkgs: {
    sample-app-python = 
        let
            defaultNix = builtins.path {
                path = /home/steve/repos/education/repos/education/178-Nix-Package-Python/sample-app-python/default.nix;
            };
        in pkgs.callPackage defaultNix {
            src = builtins.path {
                path = /home/steve/repos/education/repos/education/;
            };
            subdir = "178-Nix-Package-Python/sample-app-python";
        };
  };
```

Be sure to replace `/home/steve/repos/education` with the actual path to this repo! Then, add the package to your system packages:

```nix
  environment.systemPackages = with pkgs; [
    # ... everything else you have installed
    sample-app-python
  ];
```

If you run `sudo nixos-rebuild switch`, you should be able to run `sample-app-python` and see the web server start. Visit `http://localhost:5000` in your browser to see a "Hello World" message.

This is cool, but it would be a lot better if we didn't have to go through the effort of manually cloning this thing down. If someone else wants to use this package, it's so much easier if they can just paste something into their `configuration.nix` file and rebuild (without having to set something special up in their home area). Let's look into how to do that next.


## 3. Testing Using `default.nix`

Check the `nixos` folder in this repo for a `default.nix` you can use as a local testbed. This helped a ton when figuring out the nitty-gritty details of cloning from GitHub, because instead of having to run `nixos-rebuild switch` to rebuild your entire system, you can simply run `nix-build` and quickly check whether this tiny piece works. Then, once it works in the `default.nix` testbed, we can paste it over to our `configuration.nix` and make sure it works in NixOS, too.

For local testing, our `default.nix` file will look something like this:

```nix
{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-python = 
      let
        defaultNix = builtins.fetchurl {
        url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/178-Nix-Package-Python/sample-app-python/default.nix";
          sha256 = "";
        };
      in pkgs.callPackage defaultNix {
        src = pkgs.fetchFromGitHub {
          owner = "pagekey";
          repo = "education";
          rev = "main";  # REPLACE WITH A TAG!
          sha256 = "";
        };
        subdir = "178-Nix-Package-Python/sample-app-python";
      };
  in [
    sample-app-python
  ]
```


## 4. Building from GitHub

We have to upgrade out application's `default.nix` in to add two new args: `src` and `subdir`.

This argument allows us to override where the source code is coming from. We'll get into that more later, but since we're just doing a local build, `./src` is perfect for now.

I renamed `src` to `theSource` because without this, the `src` variable shadows itself and results in an infinite recursion - the good ol' stack overflow error. If you want to see what I mean, try deleting the line that says `let theSource = src; in`.

The `subdir` argument is something I added because this is nested in the PageKey `education` repo. Most people probably won't need to override this, but if you have a monorepo with tons of C applications in it, this may come in handy!

We'll use the same app `default.nix` from before, but we can use `fetchurl` and `fetchFromGitHub` to gather sources remotely instead of using local paths on our computer.

Let's test it out. Instead of directly updating NixOS, start by changing our test `default.nix` from the previous step to use these new args:

```nix
{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-python = 
      let
        defaultNix = builtins.fetchurl {
        url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/178-Nix-Package-Python/sample-app-python/default.nix";
          sha256 = "";
        };
      in pkgs.callPackage defaultNix {
        src = pkgs.fetchFromGitHub {
          owner = "pagekey";
          repo = "education";
          rev = "main";  # REPLACE WITH A TAG!
          sha256 = "";
        };
        subdir = "178-Nix-Package-Python/sample-app-python";
      };
  in [
    sample-app-python
  ]
```

Run this with `nix-build`. If you see a hash mismatch error, that's good! Copy the hash it's expecting and paste it into the blank `sha256 = "";` block. There are two of them, so start at the top and work your way down.

Notice how we're now using the `src` arg that we added as inputs to `sample-app-python/default.nix`.

Just like before, once it's working, you should be able to put it directly into your NixOS `configuration.nix` file:

```nix
  environment.systemPackages = with pkgs; [
    # ... everything else you have installed
    sample-app-python
  ];
  nixpkgs.config.packageOverrides = pkgs: {
    sample-app-python =
      let
        defaultNix = builtins.fetchurl {
        url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/178-Nix-Package-Python/sample-app-python/default.nix";
          sha256 = "";
        };
      in pkgs.callPackage defaultNix {
        src = pkgs.fetchFromGitHub {
          owner = "pagekey";
          repo = "education";
          rev = "main";  # REPLACE WITH A TAG!
          sha256 = "";
        } + "/177-Nix-Package-Python/sample-app-python";
      };
  };
```

Run `sudo nixos-rebuild switch` and your `sample-app-python` is available, built directly from GitHub!



## Conclusion

I hope this tutorial was helpful to you! I'm very excited about the possibilities that come with being about to write **and distribute** my own binary applications within the Nix ecosystem, but unfortunately, it was pretty hard to figure out how to do this. Maybe this post will shorten the path for others trying to do the same!

If you enjoyed, consider subscribing to the [PageKey YouTube channel](https://youtube.com/@PageKey) and/or starring this GitHub repo. Thanks!


## Sources

- [Nix Packages - Why Does Nothing Work](https://www.youtube.com/watch?v=CqFcl4BmbN4): This post is heavily based on this video! Thank you to the person who made it. It seems to be the only video on YouTube showing how to do this as of December 2024.
- NixOS forums and other random Google adventures.
- Lots of trial and error.
- [Nixpkgs Python Docs](https://github.com/NixOS/nixpkgs/blob/master/doc/languages-frameworks/python.section.md#running-python-scripts-and-using-nix-shell-as-shebang-running-python-scripts-and-using-nix-shell-as-shebang): Tells you exactly how to get a reproducible shell and package up scripts to use it.
