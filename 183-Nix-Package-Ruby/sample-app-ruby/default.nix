{ pkgs ? import <nixpkgs> { }, src ? ./., subdir ? "" }:

let
  theSource = src;
  builtGem = pkgs.buildRubyGem rec {
    name = "sample-app-ruby";
    gemName = "sample-app-ruby";
    version = "1.0.0";

    src = "${theSource}/${subdir}";

    meta = with pkgs.lib; {
      description = "A simple Ruby Hello World gem with colorize dependency";
      license = licenses.mit;
      platforms = platforms.all;
    };
  };
in
pkgs.stdenv.mkDerivation rec {
  name = "sample-app-ruby";

  propagatedBuildInputs = [ pkgs.ruby builtGem ];

  src = "${theSource}/${subdir}";

  installPhase = ''
    mkdir -p $out/bin
    cat > $out/bin/${name} <<EOF
#!/bin/sh
exec ${pkgs.ruby}/bin/ruby ${builtGem}/bin/sample-app-ruby "\$@"
EOF
    chmod +x $out/bin/${name}
  '';

  meta = with pkgs.lib; {
    description = "A simple Ruby application";
    license = licenses.mit;
  };
}
