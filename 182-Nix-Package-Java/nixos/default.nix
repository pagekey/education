{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-java = 
    let
      # Download from GitHub:
    #   defaultNix = builtins.fetchurl {
    #   url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/182-Nix-Package-Java/sample-app-java/default.nix";
    #     sha256 = "sha256:1084z6bdqvgk28hxbyprliwqaj7dv1wk5dw64alnk4fw5l5zyx5a";
    #   };
      # Uncomment for local testing:
      defaultNix = builtins.path {
        path = ../sample-app-java;
      };
    in pkgs.callPackage defaultNix {
      # Download from GitHub:
    #   src = pkgs.fetchFromGitHub {
    #     owner = "pagekey";
    #     repo = "education";
    #     rev = "main";  # REPLACE WITH A TAG!
    #     sha256 = "";
    #   };
    #   subdir = "182-Nix-Package-Java/sample-app-java/src";
      
      # Uncomment for local testing:
      src = builtins.path {
        path = ./..;
      };
      subdir = "/sample-app-java/src";
    };
  in [
    sample-app-java
  ]
