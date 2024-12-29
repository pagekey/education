{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-python = 
    let
      defaultNix = builtins.fetchurl {
      url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/178-Nix-Package-Python/sample-app-python/default.nix";
        sha256 = "sha256:1zw57ghlab31b3klxgsdm06lbkk9hqry42yzv5n9sjabjpbk65rh";
      };
    in pkgs.callPackage defaultNix {
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "main";  # REPLACE WITH A TAG!
        sha256 = "sha256-qDxOjW166UYX5wanu3Q/GJ1z75vOmyDfyp8TtBJE9Nw=";
      };
      subdir = "/178-Nix-Package-Rust/sample-app-python";
    };
  in [
    sample-app-python
  ]
