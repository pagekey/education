{ pkgs ? import <nixpkgs> { }, src ? ./. }:

let theSource = src; in
pkgs.rustPlatform.buildRustPackage rec {
  pname = "sample-app-rust";
  version = "1.0.0";
  cargoLock.lockFile = ./Cargo.lock;
  src = pkgs.lib.cleanSource theSource;
}
