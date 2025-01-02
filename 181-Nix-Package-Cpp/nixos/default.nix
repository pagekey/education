{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-cpp = 
    let
      # Download from GitHub:
    #   defaultNix = builtins.fetchurl {
    #   url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/181-Nix-Package-Cpp/sample-app-cpp/default.nix";
    #     sha256 = "";
    #   };
      # Uncomment for local testing:
      defaultNix = builtins.path {
        path = ../sample-app-cpp;
      };
    in pkgs.callPackage defaultNix {
      # Download from GitHub:
    #   src = pkgs.fetchFromGitHub {
    #     owner = "pagekey";
    #     repo = "education";
    #     rev = "main";  # REPLACE WITH A TAG!
    #     sha256 = "";
    #   };
    #   subdir = "180-Nix-Package-Cpp/sample-app-cpp";
      
      # Uncomment for local testing:
      src = builtins.path {
        path = ./..;
      };
      subdir = "/sample-app-cpp";
    };
  in [
    sample-app-cpp
  ]
