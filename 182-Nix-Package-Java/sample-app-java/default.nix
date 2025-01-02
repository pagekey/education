{ pkgs ? import <nixpkgs> { }, src ? ./src, subdir ? "" }:

let
  theSource = src;
  runnableJar = pkgs.stdenv.mkDerivation rec {
    pname = "sample-app-java";
    version = "1.0.0";

    src = "${theSource}/${subdir}";

    nativeBuildInputs = with pkgs; [ jdk ];

    meta = with pkgs.lib; {
      description = "A simple Hello World program in Java";
      license = licenses.mit;
      platforms = platforms.all;
    };

    buildPhase = ''
      mkdir build
      javac ${src}/HelloWorld.java -d .

      # Create a manifest file for the JAR
      echo "Main-Class: HelloWorld" > manifest.mf

      # Package the .class file into a runnable JAR
      jar cmf manifest.mf sample-app-java.jar HelloWorld.class
    '';

    installPhase = ''
      # Place the JAR in the bin directory
      mkdir -p $out/bin
      cp sample-app-java.jar $out/bin/

      # TODO create shell script to invoke `java -jar`
    '';
  };
in
pkgs.stdenv.mkDerivation rec {
  name = "sample-app-java";

  propagatedBuildInputs = [ pkgs.jdk runnableJar ];

  src = "${theSource}/${subdir}";

  installPhase = ''
    mkdir -p $out/bin
    cat > $out/bin/${name} <<EOF
#!/bin/sh
exec ${pkgs.jdk}/bin/java -jar ${runnableJar}/bin/sample-app-java.jar "\$@"
EOF
    chmod +x $out/bin/${name}
  '';

  meta = with pkgs.lib; {
    description = "A simple Java application";
    license = licenses.mit;
  };
}
