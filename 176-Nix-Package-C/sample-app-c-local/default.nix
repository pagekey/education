{ pkgs ? import <nixpkgs> { } }:


pkgs.stdenv.mkDerivation rec {
    pname = "sample-app-c";
    version = "1.0.0";

    src = ./src;

    nativeBuildInputs = [ pkgs.stdenv.cc ];

    buildPhase = ''
        gcc -o ${pname} ${src}/main.c
    '';
    installPhase = ''
        mkdir -p $out/bin
        mv ${pname} $out/bin/
    '';
}
