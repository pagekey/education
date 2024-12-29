{ pkgs ? import <nixpkgs> { }, src ? ./src, subdir ? "" }:


let theSource = src; in
pkgs.stdenv.mkDerivation rec {
    pname = "sample-app-c";
    version = "1.0.0";

    src = theSource;

    nativeBuildInputs = [ pkgs.stdenv.cc ];

    buildPhase = ''
        gcc -o ${pname} ${src}/${subdir}/main.c
    '';
    installPhase = ''
        mkdir -p $out/bin
        mv ${pname} $out/bin/
    '';
}
