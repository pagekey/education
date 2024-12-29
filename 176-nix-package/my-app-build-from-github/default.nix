{ pkgs ? import <nixpkgs> { } }:

pkgs.rustPlatform.buildRustPackage rec {
  pname = "nix-rust-example";
  version = "0.1.0";
  src = pkgs.fetchFromGitHub {
    owner = "pagekey";
    repo = "nix-rust-example";
    rev = "0.1.0";
    sha256 = "gjg4LqneuMHVJn0Cjoq5dtop/iHg+x6M9vXjv7Y1fYc=";
  };

  cargoLock.lockFile = "${src}/Cargo.lock";

  doCheck = false;
}
