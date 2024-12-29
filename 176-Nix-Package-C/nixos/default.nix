{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-c =
    let
      defaultNix = builtins.fetchurl {
        url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/176-Nix-Package-C/sample-app-c/default.nix?abc=def";
        sha256 = "";
      };
    in pkgs.callPackage defaultNix {
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "main";  # REPLACE WITH A TAG!
        sha256 = "";
      };
      subdir = "176-Nix-Package-C/sample-app-c/src";
    };
  in [
    sample-app-c
  ]
