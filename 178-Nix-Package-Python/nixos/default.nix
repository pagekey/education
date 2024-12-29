{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-python = 
    let
      # Download from GitHub:
      defaultNix = builtins.fetchurl {
      url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/178-Nix-Package-Python/sample-app-python/default.nix";
        sha256 = "sha256:0mhjp9ig4g4wahkkrncpq5bc3f6bcnkg5qpa54dsyp0r3s669hbz";
      };
      # Uncomment for local testing:
      # defaultNix = builtins.path {
      #   path = ../sample-app-python;
      # };
    in pkgs.callPackage defaultNix {
      # Download from GitHub:
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "main";  # REPLACE WITH A TAG!
        sha256 = "sha256-erg+Fs8l7CgzghXz1grrtd6jhm1Zj1SdENq3eAphSD8=";
      };
      subdir = "178-Nix-Package-Python/sample-app-python";
      
      # Uncomment for local testing:
      # src = builtins.path {
      #   path = ./..;
      # };
      # subdir = "/sample-app-python";
    };
  in [
    sample-app-python
  ]
