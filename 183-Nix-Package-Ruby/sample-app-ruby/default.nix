{ pkgs ? import <nixpkgs> { } }:

pkgs.buildRubyGem rec {
  name = "sample-app-ruby";
  gemName = "sample-app-ruby";
  version = "1.0.0";

  src = ./.;

  meta = with pkgs.lib; {
    description = "A simple Ruby Hello World gem with colorize dependency";
    license = licenses.mit;
    platforms = platforms.all;
  };
}
