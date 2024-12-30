{ pkgs ? import <nixpkgs> {} }:

# pkgs.stdenv.mkDerivation {
#   pname = "sample-app-node";
#   version = "1.0.0";

#   src = pkgs.lib.cleanSource ./.;

#   buildInputs = [
#     pkgs.nodejs_22
#   ];

#   buildPhase = ''
#     npm install
#   '';

#   installPhase = ''
#     npm config set cache $out/npm-cache
#     npm config set tmp $out/npm-temp
#     mkdir -p $out/build
#     npm pack --pack-destination $out/build --verbose
#     ls -a
#     pwd
#     mkdir -p $out/dist
#     cp -v *.tgz $out/dist
#   '';

#   meta = with pkgs.lib; {
#     description = "An example npm package built with Nix.";
#     license = licenses.mit;
#   };
# }


pkgs.buildNpmPackage rec {
  pname = "sample-app-node-package";
  version = "1.0.0";

  src = ./.;

  npmDepsHash = "sha256-cgfEGoEh2RDfoyNimw7Or1lqj4kG3tl4+I/mfWozd00=";
  # npmBuildScript = "build";
  dontNpmBuild = true;

  installPhase = ''
    mkdir -p $out/bin $out/lib
    cp -rv package.json $out/lib
    cp -rv ${src}/src $out/lib

    cat > $out/bin/${pname} << EOF
#!/bin/sh
${pkgs.lib.getExe pkgs.nodejs} $out/lib/src/app.js
EOF

    chmod +x $out/bin/${pname}
  '';
  
  meta.mainProgram = "${pname}";
}
