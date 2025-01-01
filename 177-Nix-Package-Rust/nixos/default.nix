{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-rust =
    let
      defaultNix = builtins.fetchurl {
      url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/177-Nix-Package-Rust/sample-app-rust/default.nix";
        sha256 = "sha256:024c96sg6b7w56jpixl388kz9qsxll9avpymmg6v8lkbsg4na1lx";
      };
    in pkgs.callPackage defaultNix {
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "main";  # REPLACE WITH A TAG!
        sha256 = "sha256-8ovnrRe1B4iTDHU+reyNnTIrmDwMcG2rIh3DtI0TZ9Q=";
      } + "/177-Nix-Package-Rust/sample-app-rust";
    };
  in [
    sample-app-rust
  ]
