# Nix: Build and Distribute a Node.js Application

Wouldn't it be great if, instead of just using the stuff already on Nixpkgs, you could write your own application and use it on NixOS? Better yet, if you can do that, then you can give the same snippet to other people, and they can use your app, too!

Note that I seriously doubt that this method is repeatable, and is likely very inefficient, but it works! I'm open to suggestions on how to improve this process.

Node, like Python, is an interesting language to fit into the Nix ecosystem because you need to bundle all of the dependent packages along with the executable you run, because the executable is basically just a script! The workaround was to bundle the Node interpreter and all dependent packages into an environment derivation that gets stored in the Nix store. Then, this environment is pulled in by the executable script.

Like all of the other articles, we'll use `fetchurl` and `fetchFromGitHub` to download and build the source code dynamically, rather than having to clone something manually.

I used a commit hash instead of a tag in this example, but for any of your apps, you'll want to create a Git tag for this.

## Try it!

My `sample-app-node` is NOT on nixpkgs, but you can still easily install it on your NixOS system! Just paste the following code into your `configuration.nix` to try it out:

```nix
  environment.systemPackages = with pkgs; [
    # ... everything else you have installed
    sample-app-node
  ];
  nixpkgs.config.packageOverrides = pkgs: {
    sample-app-node = 
        let
        defaultNix = builtins.fetchurl {
            url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/179-Nix-Package-Node/sample-app-node/default.nix";
            sha256 = "sha256:0m2s7r44yqpy56lii9n1y9xdz1blqcgdfdx6b71gh5khh099b78c";
        };
        in pkgs.callPackage defaultNix {
            src = pkgs.fetchFromGitHub {
                owner = "pagekey";
                repo = "education";
                rev = "main";  # REPLACE WITH A TAG!
                sha256 = "sha256-fCo27a8r8bdM//d4R0qmpmJLm+m78xnwbsMSZt3dUMI=";
            };
            subdir = "179-Nix-Package-Node/sample-app-node";
        };
  };
```

Run `sudo nixos-rebuild switch` and you'll have **my** executable on your system! Run it by typing `sample-app-node`.


## Quick Demo

If you just want to make something happen with this code in this repo, `cd` to this directory and run these commands:

```bash
cd sample-app-node
nix-build
./result/bin/sample-app-node
cd ../nixos
nix-build
./result/bin/sample-app-node
```

There's also a dev shell you can play with by running:

```bash
cd sample-app-node
nix-shell
```

Read on to figure out why this is so useful!

## 1. Creating the Node Application (Env, Package, App)

Let's create a valid Node package to hold our application. Here's what our directory tree looks like:

```
sample-app-node/
  src/
    app.js
  .gitignore
  default.nix
  package.json
```

Inside `app.js`, you'll find a simple Express web server, which demonstrate that we can import third-party packages:

```js
console.log("Hello world from Node");

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/echo', (req, res) => {
  res.json({ received: req.body });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
```

The `default.nix` is where things get interesting:

```nix
{ pkgs ? import <nixpkgs> {}, src ? ./., subdir ? "" }:

let
  theSource = src;
  nodeEnv =
    pkgs.stdenv.mkDerivation rec {
      pname = "sample-app-node-env";
      version = "1.0.0";

      src = pkgs.lib.cleanSource "${theSource}/${subdir}";

      buildInputs = [
        pkgs.nodejs_22
      ];


      buildPhase = ''
        npm install
        # npm install --verbose # if it hangs, use this line instead.
      '';

      installPhase = ''
        mkdir -p $out
        cp -r node_modules $out/node_modules
      '';

      meta = with pkgs.lib; {
        description = "An example Node environment built with Nix.";
        license = licenses.mit;
      };
    };
in
  pkgs.buildNpmPackage rec {
    pname = "sample-app-node";
    version = "1.0.0";

    src = "${theSource}/${subdir}";

    npmDepsHash = "sha256-cgfEGoEh2RDfoyNimw7Or1lqj4kG3tl4+I/mfWozd00=";
    # npmBuildScript = "build";
    dontNpmBuild = true;

    installPhase = ''
      mkdir -p $out/bin $out/lib
      cp -rv package.json $out/lib
      cp -rv ${src}/src $out/lib
      cp -rv ${nodeEnv}/node_modules $out/lib

      cat > $out/bin/${pname} << EOF
  #!/bin/sh
  NODE_PATH=$out/lib/node_modules ${pkgs.nodejs_22}/bin/node $out/lib/src/app.js
  EOF

      chmod +x $out/bin/${pname}
    '';
    
    meta.mainProgram = "${pname}";
  }
```

There's a lot going on here. First, we're passing `src` and `subdir` into the function with defaults so that we can override them later with the source code we download from GitHub. Also, you'll notice that in the `installPhase`, we're creating a shell script to run `app.js`. This allows us to use the same format as compiled applications such as C or Rust - just a simple executable to run when you're ready to use the application, rather than having to mess around with which script to run, which interpreter to use, and all those other annoying Node-specific details.


## 2. Running in NixOS (Local-Only)

As long as this package already exists somewhere on our computer (because we manually wrote it or cloned it into our home area), it's very straightforward to add this to our NixOS system. Just add the package to your `packageOverrides` in `configuration.nix`:

```nix
  nixpkgs.config.packageOverrides = pkgs: {
    sample-app-node = 
        let
            defaultNix = builtins.path {
                path = /home/steve/repos/education/repos/education/179-Nix-Package-Node/sample-app-node/;
            };
        in pkgs.callPackage defaultNix {
            src = builtins.path {
                path = /home/steve/repos/education/repos/education/;
            };
            subdir = "179-Nix-Package-Node/sample-app-node";
        };
  };
```

Be sure to replace `/home/steve/repos/education` with the actual path to this repo! Then, add the package to your system packages:

```nix
  environment.systemPackages = with pkgs; [
    # ... everything else you have installed
    sample-app-node
  ];
```

If you run `sudo nixos-rebuild switch`, you should be able to run `sample-app-node` and see the web server start. Visit `http://localhost:3000` in your browser to see a "Hello World" message.

This is cool, but it would be a lot better if we didn't have to go through the effort of manually cloning this thing down. If someone else wants to use this package, it's so much easier if they can just paste something into their `configuration.nix` file and rebuild (without having to set something special up in their home area). Let's look into how to do that next.


## 3. Testing Using `default.nix`

Check the `nixos` folder in this repo for a `default.nix` you can use as a local testbed. This helped a ton when figuring out the nitty-gritty details of cloning from GitHub, because instead of having to run `nixos-rebuild switch` to rebuild your entire system, you can simply run `nix-build` and quickly check whether this tiny piece works. Then, once it works in the `default.nix` testbed, we can paste it over to our `configuration.nix` and make sure it works in NixOS, too.


## Conclusion

I hope this tutorial was helpful to you! I'm very excited about the possibilities that come with being about to write **and distribute** my own binary applications within the Nix ecosystem, but unfortunately, it was pretty hard to figure out how to do this. Maybe this post will shorten the path for others trying to do the same!

If you enjoyed, consider subscribing to the [PageKey YouTube channel](https://youtube.com/@PageKey) and/or starring this GitHub repo. Thanks!


## Sources

- [Nix Packages - Why Does Nothing Work](https://www.youtube.com/watch?v=CqFcl4BmbN4): This post is heavily based on this video! Thank you to the person who made it. It seems to be the only video on YouTube showing how to do this as of December 2024.
- NixOS forums and other random Google adventures.
- Lots of trial and error.
