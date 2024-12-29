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

Installing in NixOS from GitHub:

```nix

```
