# My App

This is a minimal Python app to show how you can invoke your own executables from inside Blender.

## Getting Started

While this could be configured as a full Python package eventually, for simplicity it just uses virtual environments. It requires no external packages, but your Python installation needs to have `tkinter` support.

Unfortunately, `tkinter` is not a package you can install, but rather an option that must be enabled when Python is compiled.

Run these commands to get started:

```bash
python3 -m venv .venv # create the virtual environment
source .venv/bin/activate # activate the virtual environment
python3 src/my_app/main.py
```
