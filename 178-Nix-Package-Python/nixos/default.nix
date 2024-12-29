{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-python = 
    let
      defaultNix = builtins.fetchurl {
      url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/178-Nix-Package-Python/sample-app-python/default.nix";
        sha256 = "19z3qf82vl05ayq033lrhsjaqw8400pf9860v4ii3jr93j9ba1f3";
      };
    in pkgs.callPackage defaultNix {
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "main";  # REPLACE WITH A TAG!
        sha256 = "";
      } + "/178-Nix-Package-Rust/sample-app-python";
    };
  in [
    sample-app-python
  ]
