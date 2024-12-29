{ pkgs ? import <nixpkgs> { } }:

let
  pythonEnv = pkgs.python311.buildEnv.override {
    extraLibs = [ pkgs.python311Packages.flask ];
    ignoreCollisions = true;
  };
in
pkgs.stdenv.mkDerivation rec {
  name = "sample-app-python";

  propagatedBuildInputs = [ pythonEnv ];

  src = ./src;

  installPhase = ''
    mkdir -p $out/bin
    cat > $out/bin/${name} <<EOF
#!/bin/sh
exec ${pythonEnv}/bin/python3 ${src}/main.py "\$@"
EOF
    chmod +x $out/bin/${name}
  '';

  meta = with pkgs.lib; {
    description = "A Python application with Flask and main executable";
    license = licenses.mit;
  };
}
