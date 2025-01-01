{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-node = 
    let
      # Download from GitHub:
    #   defaultNix = builtins.fetchurl {
    #   url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/179-Nix-Package-Node/sample-app-node/default.nix";
    #     sha256 = "sha256:01im7d53fw6sk70s1m3mdki2bpd7qvlwapbgi445cs7a0l3d6gij";
    #   };
      # Uncomment for local testing:
      defaultNix = builtins.path {
        path = ../sample-app-node;
      };
    in pkgs.callPackage defaultNix {
      # Download from GitHub:
    #   src = pkgs.fetchFromGitHub {
    #     owner = "pagekey";
    #     repo = "education";
    #     rev = "main";  # REPLACE WITH A TAG!
    #     sha256 = "";
    #   };
    #   subdir = "179-Nix-Package-Node/sample-app-node";
      
      # Uncomment for local testing:
      src = builtins.path {
        path = ./..;
      };
      subdir = "/sample-app-node";
    };
  in [
    sample-app-node
  ]
