{
  description = "Qt Hello World in Nix";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }: {
    defaultPackage.x86_64-linux = let
      pkgs = import nixpkgs { system = "x86_64-linux"; };
    in
    pkgs.stdenv.mkDerivation {
      name = "hello";
      src = self;
      buildInputs = [ pkgs.cmake pkgs.qt6.qtbase ];
      dontWrapQtApps = true;
      configurePhase = ''
        mkdir build
        cd build
        cmake ../src
      '';
      buildPhase = ''
        make
      '';
      installPhase = ''
        mkdir -p $out/bin
        mv NixQt $out/bin/hello
      '';
    };
    # Define the development shell
    devShell.x86_64-linux = let
      pkgs = import nixpkgs { system = "x86_64-linux"; };
    in
    pkgs.mkShell {
      buildInputs = with pkgs; [
        cmake
        cmakeCurses
        boost
        glfw-wayland
      ];
    };
  };
}
