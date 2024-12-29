{ pkgs ? import <nixpkgs> { }, src ? ./. }:

let
  theSource = src;
  pythonPackage = pkgs.python311Packages.buildPythonPackage {
    pname = "sample-app-python";
    version = "1.0.0";

    # Point to your Python package source
    src = theSource;

    # Optional: Specify build inputs (dependencies for setup/install)
    buildInputs = [ pkgs.python311Packages.setuptools pkgs.python311Packages.wheel ];
    propagatedBuildInputs = [ pkgs.python311Packages.flask ];

    # Optional: Metadata for pip (like setup.py or pyproject.toml)
    meta = {
      description = "My Python package with Flask";
      license = pkgs.lib.licenses.mit;
    };
  };
  pythonEnv = pkgs.python311.buildEnv.override {
    extraLibs = [ pkgs.python311Packages.flask pythonPackage ];
    ignoreCollisions = true;
  };
in
pkgs.stdenv.mkDerivation rec {
  name = "sample-app-python";

  propagatedBuildInputs = [ pythonEnv ];

  src = "${theSource}/src";

  installPhase = ''
    mkdir -p $out/bin
    cat > $out/bin/${name} <<EOF
#!/bin/sh
exec ${pythonEnv}/bin/python3 ${src}/sample_app_python/main.py "\$@"
EOF
    chmod +x $out/bin/${name}
  '';

  meta = with pkgs.lib; {
    description = "A Python application with Flask and main executable";
    license = licenses.mit;
  };
}
