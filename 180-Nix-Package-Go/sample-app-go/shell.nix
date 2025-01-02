{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "go-dev-shell";

  buildInputs = [
    pkgs.go
  ];
}
