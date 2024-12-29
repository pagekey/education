{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-c = 
    pkgs.callPackage /home/steve/repos/education/176-Nix-Package-C/sample-app-c/default.nix {
      src = /home/steve/repos/education/176-Nix-Package-C/sample-app-c/src;
    } ;
  in [
    sample-app-c
  ]