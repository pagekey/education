import tkinter as tk
from pathlib import Path
import os


def run_command():
    os.system("echo hello at $(date) >> /tmp/myfile.txt")
    print("Ran command.")


def main():
    root = tk.Tk()
    root.title("My App")
    
    label = tk.Label(root, text="Hello world! from outside Blender")
    label.pack()

    button = tk.Button(root, text="Run command", command=run_command)
    button.pack()
    
    root.mainloop()


if __name__ == "__main__":
    main()
