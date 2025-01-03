{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell {
    buildInputs = with pkgs; [
        python311
        python311Packages.flask
    ];
    shellHook = ''
        export PYTHONPATH=$PYTHONPATH:${toString ./src}
    '';
}
