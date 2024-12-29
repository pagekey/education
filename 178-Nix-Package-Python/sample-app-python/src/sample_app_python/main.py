from flask import Flask
from sample_app_python.other import some_var

app = Flask(__name__)

@app.route('/')
def hello_world():
    return "Hello world from Nix and Flask!"

if __name__ == "__main__":
    print(f"Imported: {some_var}")
    app.run(debug=True)
