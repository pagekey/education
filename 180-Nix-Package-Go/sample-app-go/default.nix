{ pkgs ? import <nixpkgs> { } }:
pkgs.buildGoModule {
  pname = "sample-app-go";
  version = "1.0.0";

  src = ./.;

  vendorHash = "sha256-TjLx8n7/E0BOhMF1mOSInidXQKZePCkOhReZAiliGRw=";
  proxyVendor = true;
}
