{ pkgs ? import <nixpkgs> { }, src ? ./src, subdir ? ./. }:

let theSource = src; in
pkgs.stdenv.mkDerivation rec {
    pname = "my-app-c";
    version = "1.0.0";

    src = theSource;

    nativeBuildInputs = [ pkgs.stdenv.cc ];

    buildPhase = ''
        gcc -o my-app-c ${src}/${subdir}/hello.c
    '';
    installPhase = ''
        mkdir -p $out/bin
        mv my-app-c $out/bin/
    '';
}
