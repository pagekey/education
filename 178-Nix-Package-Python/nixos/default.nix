{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-python = 
    let
      # Download from GitHub:
      defaultNix = builtins.fetchurl {
      url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/178-Nix-Package-Python/sample-app-python/default.nix";
        sha256 = "sha256:0v8rdh4j8z4mhxxxw76hrycbjdxb30wm754q83gnrmby3v784v7m";
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
        sha256 = "sha256-DYabJIZ9dOPdPC/m/Fj/wDkkLp6EndXgPkEpons8vqM=";
      };
      
      # Uncomment for local testing:
      src = builtins.path {
        path = ./..;
      };
      subdir = "/sample-app-python";
    };
  in [
    sample-app-python
  ]
