{ pkgs ? import <nixpkgs> { } }:

let
  sample-app-go = 
    let
      # Download from GitHub:
      defaultNix = builtins.fetchurl {
      url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/179-Nix-Package-Go/sample-app-go/default.nix";
        sha256 = "sha256:0w1cf4rg5fnjq564am6vdvqvm2ii1fmp9wfdxjkgd01wrmkrsgjk";
      };
      # Uncomment for local testing:
      # defaultNix = builtins.path {
      #   path = ..0as82j59jhfbs5r2f55vjwcj93yyin21794810d8blx2r367v8n4/sample-app-go;
      # };
    in pkgs.callPackage defaultNix {
      # Download from GitHub:
      src = pkgs.fetchFromGitHub {
        owner = "pagekey";
        repo = "education";
        rev = "main";  # REPLACE WITH A TAG!
        sha256 = "sha256-WVqhUXEbOFyRuo0B9DWEVIiw+kcLNrzlGuGIakoztnk=";
      };
      subdir = "179-Nix-Package-Go/sample-app-go";
      
      # Uncomment for local testing:
      # src = builtins.path {
      #   path = ./..;
      # };
      # subdir = "/sample-app-go";
    };
  in [
    sample-app-go
  ]
