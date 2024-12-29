{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-python = 
    let
      defaultNix = builtins.fetchurl {
      url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/178-Nix-Package-Python/sample-app-python/default.nix?abc=aaa=";
        sha256 = "sha256:1979ch1p5n8x4m5m6bw9drzww9vnqicj5axhfajjbcg6ayyib2i7";
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
