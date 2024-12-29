{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-c =
    let
          defaultNix = builtins.fetchurl {
          url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/176-nix-packages/176-nix-package/sample-app-c/default.nix?abc=defdef";
            sha256 = "15zr2dy6yqa8kslb5hwipiz4bmmik486iflabkh6x69n4d9r0c31";
          };
        in pkgs.callPackage defaultNix {
          src = pkgs.fetchFromGitHub {
            owner = "pagekey";
            repo = "education";
            rev = "176-nix-packages";  # REPLACE WITH A TAG!
            sha256 = "RKS3tGISsDm491RNeI/xeNkBx7FBMuyCo0esX2UbBpo=";
          };
          subdir = "176-nix-package/sample-app-c/src";
        };
  sample-app-rust =
    let
      defaultNix = builtins.fetchurl {
      url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/176-nix-packages/176-nix-package/sample-app-rust/default.nix?cache=7ab=c";
        sha256 = "024c96sg6b7w56jpixl388kz9qsxll9avpymmg6v8lkbsg4na1lx";
      };
    in pkgs.callPackage defaultNix {
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "176-nix-packages";  # REPLACE WITH A TAG!
        sha256 = "p3b3N2AfJndmuB8o7b3to/3p408xy/XjLUgmd6iSNqM=";
      } + "/176-nix-package/sample-app-rust";
    };
  in [
    sample-app-c
    sample-app-rust
  ]
