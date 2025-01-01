{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-node = 
    let
      # Download from GitHub:
      defaultNix = builtins.fetchurl {
      url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/179-Nix-Package-Node/sample-app-node/default.nix";
        sha256 = "sha256:0m2s7r44yqpy56lii9n1y9xdz1blqcgdfdx6b71gh5khh099b78c";
      };
      # Uncomment for local testing:
      # defaultNix = builtins.path {
      #   path = ../sample-app-node;
      # };
    in pkgs.callPackage defaultNix {
      # Download from GitHub:
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "main";  # REPLACE WITH A TAG!
        sha256 = "sha256-fCo27a8r8bdM//d4R0qmpmJLm+m78xnwbsMSZt3dUMI=";
      };
      subdir = "179-Nix-Package-Node/sample-app-node";
      
      # Uncomment for local testing:
      # src = builtins.path {
      #   path = ./..;
      # };
      # subdir = "/sample-app-node";
    };
  in [
    sample-app-node
  ]
