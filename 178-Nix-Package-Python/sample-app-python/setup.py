from setuptools import setup, find_packages

setup(
    name="sample-app-python",
    version="1.0.0",
    package_dir={"": "src"},
    packages=find_packages(where="src"),
)
