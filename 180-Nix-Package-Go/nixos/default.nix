{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-go = 
    let
      # Download from GitHub:
      defaultNix = builtins.fetchurl {
      url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/180-Nix-Package-Go/sample-app-go/default.nix";
        sha256 = "sha256:0as82j59jhfbs5r2f55vjwcj93yyin21794810d8blx2r367v8n4";
      };
      # Uncomment for local testing:
      # defaultNix = builtins.path {
      #   path = ../sample-app-go;
      # };
    in pkgs.callPackage defaultNix {
      # Download from GitHub:
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "main";  # REPLACE WITH A TAG!
        sha256 = "";
      };
      subdir = "180-Nix-Package-Go/sample-app-go";
      
      # Uncomment for local testing:
      # src = builtins.path {
      #   path = ./..;
      # };
      # subdir = "/sample-app-go";
    };
  in [
    sample-app-go
  ]
