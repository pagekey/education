# How to Publish an NPM Package

The worst thing in the world is when you have a useful tool, but no way to distribute it for other people to use. The problem of software distribution is vast and has been solved a million different ways, but in my opinion, creating an NPM package is one of the simplest ways to get your code into the hands of others.

By the end of this video, you'll know how to publish a package so that anyone with Node installed can simply type `npx @your-name/your-tool` to run your code!

This is a stepping stone to creating a React framework from scratch - if that sounds interesting, stay tuned for future videos! I'd like to call that framework PageKey Blaze, which is why the example uses the name `@pagekey/blaze`.

This tutorial is broken into four parts:

- Creating the NPM Package
- Adding a simple CLI
- Publishing to npmjs.com
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

I'll tweak the generated `package.json` ever so slightly, adding the `@pagekey/` prefix, the `private` field, and the correct `main` path:

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
#!/usr/bin/env node

import { program } from "commander";

program
  .command("new [project-name]")
  .description("Create a new project")
  .action((projectName = "my-project") => {
    console.log("Hello world from Blaze.");
  });

program.parse(process.argv);
```

Notice the line starting with `#!`. This is called the "shebang" and it's very important, because it tells your operating system what to do when someone tries to run this text file as an executable with `./src/index.mjs`. By default, it will try to use Bash, and since this file is clearly JavaScript rather than shell, you'll get an error without this!

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


## 3. Publish to npmjs.com

Now I'll try to publish this thing! Make sure that you use your username in the package name instead of `@pagekey` - hands off, that one's mine!

If you haven't already, create an account on [npmjs.com](https://npmjs.com) and then run `npm login`:

```bash
$ npm login
npm notice Log in on https://registry.npmjs.org/
Login at:
https://www.npmjs.com/login?next=/login/cli/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Press ENTER to open in the browser...
```

Now we can upload it with `npm publish --access public`. Without `--access public`, it will try to make a private package. That's a paid feature, so you'll need to pay if you want to do that! (Or self-host your own package registry - perhaps a topic for a future video!)

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

Nobody wants to use version 1.0.0 of anything, because things break. Let's pretend something broke and we're fixing it.

The problem was that our message before was too rude. Edit `src/index.mjs` and add an extra polite message:

```js
#!/usr/bin/env node

import { program } from "commander";

program
  .command("new [project-name]")
  .description("Create a new project")
  .action((projectName = "my-project") => {
    console.log("Hello world from Blaze.");
    console.log("Hope you have a great day!");
  });

program.parse(process.argv);
```

Then we can increment the version - we'll call this a "patch" change, which means that the third number will increment and we'll end up with version 1.0.1:

```bash
$ npm version patch
v1.0.1
```

Notice that after running that command, `package.json` has been automatically updated.

Similarly, you can use `npm version minor` to change the middle number and `npm version major` to change the first number. For more info on these conventions, read about [Semantic Versioning](https://semver.org/).

Now you can publish the updated version! Just run `npm publish`:

```bash
$ npm publish
npm warn publish npm auto-corrected some errors in your package.json when publishing.  Please run "npm pkg fix" to address these errors.
npm warn publish errors corrected:
npm warn publish "bin[blaze]" script name was cleaned
npm notice
npm notice 📦  @pagekey/blaze@1.0.1
npm notice Tarball Contents
npm notice 352B package.json
npm notice 102B shell.nix
npm notice 309B src/index.mjs
npm notice Tarball Details
npm notice name: @pagekey/blaze
npm notice version: 1.0.1
npm notice filename: pagekey-blaze-1.0.1.tgz
npm notice package size: 594 B
npm notice unpacked size: 763 B
npm notice shasum: 3b2ec29a1046120787fc153663f8a588efd294d4
npm notice integrity: sha512-+id7lXw5/8QDt[...]UYISX/HziA2RQ==
npm notice total files: 3
npm notice
npm notice Publishing to https://registry.npmjs.org/ with tag latest and default access
+ @pagekey/blaze@1.0.1
```


## 5. Try it out

I'll turn off the locally installed package:

```bash
$ npm unlink -g @pagekey/blaze

removed 1 package in 431ms
```

Then we can run the public package!

```bash
$ npx @pagekey/blaze
Need to install the following packages:
@pagekey/blaze@1.0.1
Ok to proceed? (y) y

Usage: blaze [options] [command]

Options:
  -h, --help          display help for command

Commands:
  new [project-name]  Create a new project
  help [command]      display help for command
```

## Wrap-Up

Now you know the process for making an account and publishing a simple tool on npmjs.com so that anyone in the world can run your code with just a few keystrokes. We'll use this skill in future videos to flesh out the PageKey Blaze frontend framework and do other fun frontend automations.

If you enjoyed this post, consider subscribing to the [YouTube Channel](https://youtube.com/@PageKey), starring the repo, or joining the [Discord](https://discord.com/invite/5m5yFgDPF5)!
