{ pkgs ? import <nixpkgs> { } }:
  let
    sample-app-c = let
        defaultNix = builtins.fetchurl {
        url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/176-nix-packages/176-nix-package/sample-app-c/default.nix";
          sha256 = "128f3fcj48x9shk8f8zswzkpr1pzisfi93ainqrq84bz5w4mgnbl";
        };
      in pkgs.callPackage defaultNix {
        src = pkgs.fetchFromGitHub {
          owner = "pagekey";
          repo = "education";
          rev = "176-nix-packages";  # REPLACE WITH A TAG!
          sha256 = "y64zp+ltXqPiNdiKcXiwN+cAK0TCRnPafh2w0YbYOtc=";
        } + "/176-nix-package/sample-app-c/src";
      };
    sample-app-rust = let
      defaultNix = builtins.fetchurl {
       url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/176-nix-packages/176-nix-package/sample-app-rust/default.nix?cache=3";
        sha256 = "1by5fy3yz3dhsx5m99z5kpz035wzca62wsbbss2yafgbf9dps21c";
      };
    in pkgs.callPackage defaultNix {
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "176-nix-packages";  # REPLACE WITH A TAG!
        sha256 = "";
      } + "/176-nix-package/sample-app-rust/src";
    };
  in [
    sample-app-c
    sample-app-rust
  ]
