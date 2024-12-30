{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-c =
    let
      defaultNix = builtins.fetchurl {
        url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/176-Nix-Package-C/sample-app-c/default.nix";
        sha256 = "sha256:05357l33rllpyw2479rb0i06mi18aqm3dn20hrywmi3zi0a6q6a1";
      };
    in pkgs.callPackage defaultNix {
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "main";  # REPLACE WITH A TAG!
        sha256 = "sha256-ub3gtFbrIVvLbkdeVnFve6FaGDlEJ0hPxd9hGDF3Zxo=";
      };
      subdir = "176-Nix-Package-C/sample-app-c/src";
    };
  in [
    sample-app-c
  ]
