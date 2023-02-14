import setuptools
from distutils.core import setup


setup(
    name='cli-example',
    version='0.0.0',
    description='Example package for a CLI',
    author='You',
    author_email='you@example.com',
    packages=['cli_example'],
    entry_points={
        'console_scripts': ['cli-example=cli_example.entry:cli_entry_point'],
    },
    install_requires=[
        'requests',
    ],
)
