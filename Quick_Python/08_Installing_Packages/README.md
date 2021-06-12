# Commands

```bash
python3 -m venv <path>
```

Creates a virutal environment located at `<path>`

```bash
source <path>/bin/activate
```

Activates a virtual environment

```bash
deactivate
```

Deactivates a virutal environment

## Bonus: Bash Alias for Quick Switching

Paste this function into your `~/.bashrc` or `~/.bash_aliases` file and restart your shell. It assumes you keep your virtual environments in the `~/venv` folder.

```bash
venv() {
    source ~/venv/$1/bin/activate
}
```

Switch to the venv with `venv <NAME>` and get out of it by typing `deactivate`.

Example:

```bash
python3 -m venv ~/venv/my-env
venv my-env
# do stuff in your environment. When done:
deactivate
```