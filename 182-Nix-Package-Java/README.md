# Nix: Build and Distribute a Java Application

Wouldn't it be great if, instead of just using the stuff already on Nixpkgs, you could write your own application and use it on NixOS? Better yet, if you can do that, then you can give the same snippet to other people, and they can use your app, too!

For Java, we'll need to create a shell script to run `java -jar` on our runnable jar. It can reference the `jdk` we used to build it, as well as the built Jar.

I used a commit hash instead of a tag in this example, but for any of your apps, you'll want to create a Git tag for this.

## Try it!

My `sample-app-java` is NOT on nixpkgs, but you can still easily install it on your NixOS system! Just paste the following code into your `configuration.nix` to try it out:

```nix
  environment.systemPackages = with pkgs; [
    # ... everything else you have installed
    sample-app-java
  ];
  nixpkgs.config.packageOverrides = pkgs: {
    sample-app-java = 
        let
        defaultNix = builtins.fetchurl {
            url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/182-Nix-Package-Java/sample-app-java/default.nix";
            sha256 = "sha256:1br4cas27gcsndy9ag2m3sp05qckkciyyqxib5ysfhlav5kspj8l";
        };
        in pkgs.callPackage defaultNix {
            src = pkgs.fetchFromGitHub {
                owner = "pagekey";
                repo = "education";
                rev = "main";  # REPLACE WITH A TAG!
                sha256 = "sha256-KgBYdj0eWAynI2Xpj/eualTxx6+AzPxgj+iwOHQwIKE=";
            };
            subdir = "182-Nix-Package-Java/sample-app-java/src";
        };
  };
```

Run `sudo nixos-rebuild switch` and you'll have **my** executable on your system! Run it by typing `sample-app-java`.


## Quick Demo

If you just want to make something happen with this code in this repo, `cd` to this directory and run these commands:

```bash
cd sample-app-java
nix-build
./result/bin/sample-app-java
cd ../nixos
nix-build
./result/bin/sample-app-java
```

There's also a dev shell you can play with by running:

```bash
cd sample-app-java
nix-shell
```

Read on to figure out why this is so useful!

## 1. Creating the Java Application

We don't need much to create a simple Java app. Here's what the directory structure looks like:

```
sample-app-java/
  src/
    HelloWorld.java
  .gitignore
  default.nix
```

Inside `HelloWorld.java`, you'll find the simplest Jav program you can imagine:

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

The `default.nix` is where things get interesting:

```nix
{ pkgs ? import <nixpkgs> { }, src ? ./src, subdir ? "" }:

let
  theSource = src;
  runnableJar = pkgs.stdenv.mkDerivation rec {
    pname = "sample-app-java";
    version = "1.0.0";

    src = "${theSource}/${subdir}";

    nativeBuildInputs = with pkgs; [ jdk ];

    meta = with pkgs.lib; {
      description = "A simple Hello World program in Java";
      license = licenses.mit;
      platforms = platforms.all;
    };

    buildPhase = ''
      mkdir build
      javac ${src}/HelloWorld.java -d .

      # Create a manifest file for the JAR
      echo "Main-Class: HelloWorld" > manifest.mf

      # Package the .class file into a runnable JAR
      jar cmf manifest.mf sample-app-java.jar HelloWorld.class
    '';

    installPhase = ''
      # Place the JAR in the bin directory
      mkdir -p $out/bin
      cp sample-app-java.jar $out/bin/

      # TODO create shell script to invoke `java -jar`
    '';
  };
in
pkgs.stdenv.mkDerivation rec {
  name = "sample-app-java";

  propagatedBuildInputs = [ pkgs.jdk runnableJar ];

  src = "${theSource}/${subdir}";

  installPhase = ''
    mkdir -p $out/bin
    cat > $out/bin/${name} <<EOF
#!/bin/sh
exec ${pkgs.jdk}/bin/java -jar ${runnableJar}/bin/sample-app-java.jar "\$@"
EOF
    chmod +x $out/bin/${name}
  '';

  meta = with pkgs.lib; {
    description = "A simple Java application";
    license = licenses.mit;
  };
}
```

There's a lot going on here. First, we're passing `src` and `subdir` into the function with defaults so that we can override them later with the source code we download from GitHub. Also, you'll notice that in the `installPhase`, we're creating a shell script to run `sample-app-java.jar`. This allows us to use the same format as compiled applications such as C or Rust - just a simple executable to run when you're ready to use the application. Otherwise, the user would have to figure out where the `java` executable is located AND remember to run `java -jar yourJar`.


## 2. Running in NixOS (Local-Only)

As long as this package already exists somewhere on our computer (because we manually wrote it or cloned it into our home area), it's very straightforward to add this to our NixOS system. Just add the package to your `packageOverrides` in `configuration.nix`:

```nix
  nixpkgs.config.packageOverrides = pkgs: {
    sample-app-java = 
        let
            defaultNix = builtins.path {
                path = /home/steve/repos/education/repos/education/181-Nix-Package-Java/sample-app-java/;
            };
        in pkgs.callPackage defaultNix {
            src = builtins.path {
                path = /home/steve/repos/education/repos/education/;
            };
            subdir = "181-Nix-Package-Java/sample-app-java";
        };
  };
```

Be sure to replace `/home/steve/repos/education` with the actual path to this repo! Then, add the package to your system packages:

```nix
  environment.systemPackages = with pkgs; [
    # ... everything else you have installed
    sample-app-java
  ];
```

If you run `sudo nixos-rebuild switch`, you should be able to run `sample-app-java` and see the web server start. Visit `http://localhost:5000` in your browser to see a "Hello World" message.

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
- [Nixpkgs Python Docs](https://github.com/NixOS/nixpkgs/blob/master/doc/languages-frameworks/python.section.md#running-python-scripts-and-using-nix-shell-as-shebang-running-python-scripts-and-using-nix-shell-as-shebang): Tells you exactly how to get a reproducible shell and package up scripts to use it.
