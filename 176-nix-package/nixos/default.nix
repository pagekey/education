{ pkgs ? import <nixpkgs> { } }:

# C Sample App:
let
      defaultNix = builtins.fetchurl {
      url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/176-nix-packages/176-nix-package/sample-app-c/default.nix?abc=deffff";
        sha256 = "128f3fcj48x9shk8f8zswzkpr1pzisfi93ainqrq84bz5w4mgnbl";
      };
    in pkgs.callPackage defaultNix {
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "176-nix-packages";  # REPLACE WITH A TAG!
        sha256 = "y64zp+ltXqPiNdiKcXiwN+cAK0TCRnPafh2w0YbYOtc=";
      };
      subdir = "176-nix-package/sample-app-c";
    }

# Rust sample app:
# let
#   defaultNix = builtins.fetchurl {
#    url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/176-nix-packages/176-nix-package/sample-app-rust/default.nix?cache=7ab=c";
#     sha256 = "024c96sg6b7w56jpixl388kz9qsxll9avpymmg6v8lkbsg4na1lx";
#   };
# in pkgs.callPackage defaultNix {
#   src = pkgs.fetchFromGitHub {
#     owner = "pagekey";
#     repo = "education";
#     rev = "176-nix-packages";  # REPLACE WITH A TAG!
#     sha256 = "p3b3N2AfJndmuB8o7b3to/3p408xy/XjLUgmd6iSNqM=";
#   } + "/176-nix-package/sample-app-rust";
# }
