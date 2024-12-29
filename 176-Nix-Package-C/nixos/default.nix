{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-c =
    let
      defaultNix = builtins.fetchurl {
        url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/176-Nix-Package-C/sample-app-c/default.nix?abc=def";
        sha256 = "1h0yvmgdikfjfygd43947fmkmz3awpdjcjlwl5wkirhifw2c9i5d";
      };
    in pkgs.callPackage defaultNix {
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "main";  # REPLACE WITH A TAG!
        sha256 = "cGsxEAMhr9Mg4vOlCCrbp1PCjEmgNUk0HkTcjCOOYMk=";
      };
      subdir = "176-Nix-Package-C/sample-app-c/src";
    };
  in [
    sample-app-c
  ]
