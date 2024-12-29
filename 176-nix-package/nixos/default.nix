{ pkgs ? import <nixpkgs> { } }:
    let
      defaultNix = builtins.fetchurl {
       url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/176-nix-package/my-app-c/default.nix";
        sha256 = "128f3fcj48x9shk8f8zswzkpr1pzisfi93ainqrq84bz5w4mgnbl";
      };
    in pkgs.callPackage defaultNix {
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "main";
        sha256 = "y64zp+ltXqPiNdiKcXiwN+cAK0TCRnPafh2w0YbYOtc=";
      } + "/176-nix-package/my-app-c/src";
    }