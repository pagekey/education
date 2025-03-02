# How to Publish an NPM Package

The worst thing in the world is when you have a useful tool, but no way to distribute it for other people to use. The problem of software distribution is vast and has been solved a million different ways, but in my opinion, creating an NPM package is one of the simplest ways to get your code into the hands of others.

By the end of this video, you'll know how to publish a package so that anyone with `npx` installed can simply type `npx @your-name/your-tool` to run your code!

This is a stepping stone to creating a React framework from scratch - if that sounds interesting, stay tuned for future videos! I'd like to call that framework PageKey Blaze, which is why the example uses the name `@pagekey/blaze`.

This tutorial is broken into four parts:

- Creating the NPM Package
- Adding a simple CLI
- Publishing to npm.org
- Publishing updates / new versions
- Making sure it works

Let's get started!


## 1. Create the Package

I'll create a directory for the project:

```bash
mkdir blaze
cd blaze
```

If you're using Nix or NixOS, the following `shell.nix` will make sure you have `node`, `npm`, and `npx` installed:

```nix
{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
    buildInputs = with pkgs; [
        nodejs
    ];
}
```

Nix users should also add the following line to your `~/.npmrc` file so that `npm link` works:

```nix
prefix=~/.npm
```

Now let's initialize the project with a `package.json`:

```bash
npm init -y
```

I'll tweak the generated `package.json` ever so slightly:

```json
{
  "name": "@pagekey/blaze",
  "private": false,
  "main": "src/index.mjs",
  ...
}
```

And we're ready to start writing code!


## 2. Add the CLI

Let's start by installing `commander`, which makes it easy to create CLI tools.

```bash
npm install commander
```

Now we can edit `src/index.mjs` and add a simple command handler:

```js
import { program } from "commander";

program
  .command("new [project-name]")
  .description("Create a new project")
  .action((projectName = "my-project") => {
    console.log("Hello world from Blaze.");
  });

program.parse(process.argv);
```

To make this an executable script in our package, we just add a `"bin"` section to the end of our `package.json`. Notice that we do NOT use a scoped name for `bin` (no `@pagekey/` prefix like the package name had):

```json
{
  ...
  "bin": {
    "blaze": "./src/index.mjs"
  }
}
```

And do

```bash
chmod +x ./src/index.mjs
```

Now we can install the package locally using `npm link` and try it out:

```bash
$ npm link

added 1 package, and audited 3 packages in 1s

found 0 vulnerabilities
```

And if we try running it locally, it works!

```bash
$ npx blaze new
Hello world from Blaze.
```


## 3. Publish to npm.org

Now I'll try to publish this thing! Make sure that you use your username in the package name instead of `@pagekey` - hands off!

```bash
$ npm login
npm notice Log in on https://registry.npmjs.org/
Login at:
https://www.npmjs.com/login?next=/login/cli/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Press ENTER to open in the browser...
```

Now we can upload it with:

```bash
$ npm publish --access public
npm warn publish npm auto-corrected some errors in your package.json when publishing.  Please run "npm pkg fix" to address these errors.
npm warn publish errors corrected:
npm warn publish "bin[blaze]" script name was cleaned
npm notice
npm notice 📦  @pagekey/blaze@1.0.0
npm notice Tarball Contents
npm notice 352B package.json
npm notice 102B shell.nix
npm notice 263B src/index.mjs
npm notice Tarball Details
npm notice name: @pagekey/blaze
npm notice version: 1.0.0
npm notice filename: pagekey-blaze-1.0.0.tgz
npm notice package size: 574 B
npm notice unpacked size: 717 B
npm notice shasum: e335ce1b3c2000442ba7197411e1af0b73b480fa
npm notice integrity: sha512-QUQgFPQUZthVo[...]Ip0Mm0ZF7Ikwg==
npm notice total files: 3
npm notice
npm notice Publishing to https://registry.npmjs.org/ with tag latest and public access
+ @pagekey/blaze@1.0.0
```

## 4. Make a change and bump version

```bash
# edit src/index.mjs
npm version patch
npm publish
```


## 4. Try it out

I'll turn off the locally installed package:

```bash
npm unlink # ???? is this a thing
```

Then we can run the public package!

```bash
npx @pagekey/blaze
TODO show the hello world output
```

## Wrap-Up

TODO
