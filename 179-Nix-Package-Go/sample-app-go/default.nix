{ pkgs ? import <nixpkgs> { }, src ? ./., subdir ? "" }:
let theSource = src; in
pkgs.buildGoModule {
  pname = "sample-app-go";
  version = "1.0.0";

  src = "${theSource}/${subdir}";

  vendorHash = "sha256-TjLx8n7/E0BOhMF1mOSInidXQKZePCkOhReZAiliGRw=";
  proxyVendor = true;
}
