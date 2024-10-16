{
  description = "A simple C++ Hello World flake";

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
      buildInputs = [ pkgs.gcc ];
      buildPhase = ''
        mkdir -p $out/bin
        g++ -o $out/bin/hello src/main.cpp
      '';
    };
  };
}



# {
#   outputs =
#     { nixpkgs, self }: # Note the use of `self` which allows reusing flake's outputs in itself
#     let
#       pkgs = import nixpkgs { system = "x86_64-linux"; };
#     in
#     {
#       packages.x86_64-linux.default = pkgs.hello;
#       devShells.x86_64-linux.default = pkgs.mkShell {
#         packages = [ self.packages.x86_64-linux.default ];
#       };
#     };
# }
