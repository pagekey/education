{ pkgs ? import <nixpkgs> {} }:

let
  nodeEnv =
    pkgs.stdenv.mkDerivation rec {
      pname = "sample-app-node-env";
      version = "1.0.0";

      src = pkgs.lib.cleanSource ./.;

      buildInputs = [
        pkgs.nodejs_22
      ];

      buildPhase = ''
        npm install
      '';

      installPhase = ''
        mkdir -p $out
        cp -r node_modules $out/node_modules
      '';

      meta = with pkgs.lib; {
        description = "An example Node environment built with Nix.";
        license = licenses.mit;
      };
    };
in
  pkgs.buildNpmPackage rec {
    pname = "sample-app-node";
    version = "1.0.0";

    src = ./.;

    npmDepsHash = "sha256-cgfEGoEh2RDfoyNimw7Or1lqj4kG3tl4+I/mfWozd00=";
    # npmBuildScript = "build";
    dontNpmBuild = true;

    installPhase = ''
      mkdir -p $out/bin $out/lib
      cp -rv package.json $out/lib
      cp -rv ${src}/src $out/lib
      cp -rv ${nodeEnv}/node_modules $out/lib

      cat > $out/bin/${pname} << EOF
  #!/bin/sh
  NODE_PATH=$out/lib/node_modules ${pkgs.nodejs_22}/bin/node $out/lib/src/app.js
  EOF

      chmod +x $out/bin/${pname}
    '';
    
    meta.mainProgram = "${pname}";
  }
