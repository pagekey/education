# Nix Qt

## Gettings Started

Build the project:

```bash
git add .
nix build
```

Run the project:

```bash
nix run
```

Try out a development shell:

```bash
nix develop
mkdir build
cd build
cmake ../src
make
./NixQt
```


## Notes

- Make sure `flake.nix` and all source files are in Git, or else you'll get a weird "not found" error.
