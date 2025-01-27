{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-java = 
    let
      # Download from GitHub:
      defaultNix = builtins.fetchurl {
      url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/181-Nix-Package-Java/sample-app-java/default.nix";
        sha256 = "sha256:1br4cas27gcsndy9ag2m3sp05qckkciyyqxib5ysfhlav5kspj8l";
      };
      # Uncomment for local testing:
    #   defaultNix = builtins.path {
    #     path = ../sample-app-java;
    #   };
    in pkgs.callPackage defaultNix {
      # Download from GitHub:
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "main";  # REPLACE WITH A TAG!
        sha256 = "sha256-D9vzTDHqNn8tjSbUBlqECdm+nPt+8pknbXBg+sVI7UQ=";
      };
      subdir = "181-Nix-Package-Java/sample-app-java/src";
      
      # Uncomment for local testing:
    #   src = builtins.path {
    #     path = ./..;
    #   };
    #   subdir = "/sample-app-java/src";
    };
  in [
    sample-app-java
  ]
