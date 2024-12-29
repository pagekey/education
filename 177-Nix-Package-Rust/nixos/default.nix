{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-c =
    let
          defaultNix = builtins.fetchurl {
          url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/177-nix-package-rust/176-Nix-Package-C/sample-app-c/default.nix?abc=defdef";
            sha256 = "1h0yvmgdikfjfygd43947fmkmz3awpdjcjlwl5wkirhifw2c9i5d";
          };
        in pkgs.callPackage defaultNix {
          src = pkgs.fetchFromGitHub {
            owner = "pagekey";
            repo = "education";
            rev = "177-nix-package-rust";  # REPLACE WITH A TAG!
            sha256 = "Tadhnpv2Y8p93qNqJYGujMF4z/+4TLQBux4bnV/JUbg=";
          };
          subdir = "176-Nix-Package-C/sample-app-c/src";
        };
  sample-app-rust =
    let
      defaultNix = builtins.fetchurl {
      url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/177-nix-package-rust/177-Nix-Package-Rust/sample-app-rust/default.nix";
        sha256 = "024c96sg6b7w56jpixl388kz9qsxll9avpymmg6v8lkbsg4na1lx";
      };
    in pkgs.callPackage defaultNix {
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "177-nix-package-rust";  # REPLACE WITH A TAG!
        sha256 = "Tadhnpv2Y8p93qNqJYGujMF4z/+4TLQBux4bnV/JUbg=";
      } + "/177-Nix-Package-Rust/sample-app-rust";
    };
  in [
    sample-app-c
    sample-app-rust
  ]
