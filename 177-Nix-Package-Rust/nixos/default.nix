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
    sample-app-rust = 
      pkgs.callPackage /home/steve/repos/education/177-Nix-Package-Rust/sample-app-rust { };
  in [
    sample-app-c
    sample-app-rust
  ]
  