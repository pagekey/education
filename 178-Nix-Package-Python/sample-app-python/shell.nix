{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell {
    buildInputs = with pkgs; [
        python311
        python311Packages.flask
        python311Packages.pyexcel-ods
    ];
}
