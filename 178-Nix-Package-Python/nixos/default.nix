{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-python = 
    let
      defaultNix = builtins.fetchurl {
      url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/178-Nix-Package-Python/sample-app-python/default.nix?abc=a=a=";
        sha256 = "sha256:0nfgx9xd28rslpyjmz82psj1japjlr8vaw4197gf7ncls23qrzpa";
      };
    in pkgs.callPackage defaultNix {
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "main";  # REPLACE WITH A TAG!
        sha256 = "sha256-gBQY/4iGucSq3TXqUp2GX1KOvnwI/jnPGBBT1S+WnUU=";
        subdir = "/178-Nix-Package-Rust/sample-app-python";
      };
    };
  in [
    sample-app-python
  ]
