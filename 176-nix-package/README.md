## Getting Started

Building and running the package locally:

```bash
cd my-app
nix-build
./result/bin/my-app
```

Using the dev shell:

```bash
cd my-app
nix-shell
cargo run
```

Installing in NixOS when cloned locally:

```nix
  environment.systemPackages = with pkgs; [
    my-app
  ];
  nixpkgs.c/home/steve/tmp/my-app/onfig.packageOverrides = pkgs: {
    my-app = pkgs.callPackage /home/steve/my-app/default.nix { }; // Replace with wherever you cloned it.
  };
```

What not to do (but what I did):

```nix
  nixpkgs.config.packageOverrides = pkgs: {
      my-app = let defaultNix = builtins.fetchurl {
      url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/176-nix-package/my-app/default.nix";
      sha256 = "1xnbsxfkgvbm98vz41rsbwg379s5bb0xg7mrbsfyni2ycm401cwz";
    };
  in pkgs.callPackage defaultNix { };
  };
```

Results in:

```bash
error: getting status of '/nix/store/Cargo.lock': No such file or directory
```

Building from GitHub:

See `my-app-package-registry/default.nix` for what it looks like.

To include in NixOS, use:

```nix
  nixpkgs.config.packageOverrides = pkgs: {
      my-app = let defaultNix = builtins.fetchurl {
      url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/176-nix-package/my-app-build-from-github/default.nix";
      sha256 = "1xnbsxfkgvbm98vz41rsbwg379s5bb0xg7mrbsfyni2ycm401cwz";
    };
  in pkgs.callPackage defaultNix { };
  };
```

Same error as before, plus you'd need to update the sha256 and commit/tag every single time there a new release.

Installing Binary Package from GitHub (uncompressed):

```nix

```

Installing Binary Package from GitHub (compressed):

```nix

```


## Sources

- [Nix Packages - Why Does Nothing Work](https://www.youtube.com/watch?v=CqFcl4BmbN4): This post is heavily based on this video! Thank you to the person who made it. It seems to be the only video on YouTube showing how to do this as of December 2024.
