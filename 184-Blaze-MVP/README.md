# React Framework from Scratch (PageKey Blaze MVP)

In the last video, we showed how you can use `esbuild`, a Typescript compiler, to patch together some React components into a real web app without using any special frameworks to make it happen. I've used this technique now for several personal projects. It works well, but the problem is that it's very clunky, and I keep copy-pasting the same code between projects.

This is actually a good thing, in my opinion. I was able to get all of the "thrashing" out of the way, and now I'm at the point where I know what I need, and I just keep copying it everywhere with minimal changes. Now, it's time to take that code and turn it into a framework so that myself and others can more easily use these things without having to copy-paste or know exactly how everything works.

There seems to be a balance you have to strike when creating abstractions. If you try to abstract things away too early, you end up with a lot of overhead/maintenance, changing interfaces, and all sorts of others things that cost time and make life harder for the people using the abstraction. However, if you wait too long, you end up with many copies of the same thing in many different places, and every copy is slightly different in unique and hard-to-remember ways. If one of the copies breaks, there's no easy way to fix them all at once or even to know what went wrong.

With this rant about when to create libraries and abstractions out of the way, let's get into the nuts and bolts of formalizing the simple process of turning React components into a usable website.

This should break down quite neatly into subsections if we begin by thinking of what we want the interface to be. For me, the following would be ideal:

- You can create a new project by running the command `npx @pagekey/blaze new`.
- In an existing project, you can use the following `npm` commands:
  - `npm run build`: Build a static site from the source code.
  - `npm run dev`: Start a dev server that reloads the page when you save source files.
  - `npm run serve`: Serve the built static site for production use.

Let's figure out how to solve each of these in succession. I'll be creating a new `npm` package in the process - I'll call it PageKey Blaze. I'll leave the MVP in this repo, but I plan to maintain it as an actual package at github.com/pagekey/blaze - see there for updates!

# Creating a CLI and Uploading to `npm.org`
# How to Publish an NPM Package

TODO write intro

## Project Generation with `npx`

To make the project generate when you run that command, we need to create a package, add a simple CLI, and publish the package to npm.org.

### 1. Create the Package

I'll create a directory for the project:

```bash
mkdir blaze
cd blaze
```

TODO add note about NixOS `shell.nix` and add `prefix=~/.npm` to `~/.npmrc` to make `npm link` work (how to do w/ home manager?)

Now let's initialize the project with a `package.json`:

```bash
npm init -y
```

I'll tweak the generated `package.json` ever so slightly:

```json
{
  "name": "@pagekey/blaze",
  "private": false,
  "main": "src/index.js",
  ...
}
```

And we're ready to start writing code!


### 2. Add the CLI

Let's start by installing `commander`, which makes it easy to create CLI tools.

```bash
npm install commander
```

Now we can edit `src/index.js` and add a simple command handler:

```js
import { program } from "commander";
import fs from "fs";
import { execSync } from "child_process";

program
  .command("new [project-name]")
  .description("Create a new project")
  .action((projectName = "my-project") => {
    console.log("Hello world from project generator.");
  });

program.parse(process.argv);
```

To make this an executable script in our package, we just add a `"bin"` section to the end of our `package.json`:

```json
{
  ...
  "bin": {
    "@pagekey/blaze": "node ./src/index.js"
  }
}
```

Now we can install the package locally using `npm link` and try it out:

```bash
$ npm link

added 1 package, and audited 3 packages in 1s

found 0 vulnerabilities
$ TODO
```

And if we try running it locally, it works!

```bash
npx @pagekey/blaze new
TODO paste working stuff here.
```


### 3. Publish to npm.org

Now I'll try to publish this thing! Make sure that you use your username in the package name instead of `@pagekey` - hands off!

```bash
npm login
```

Now we can upload it with:

```bash
npm publish #maybe needed: --access public
```


### 4. Try it out

I'll turn off the locally installed package:

```bash
npm unlink # ???? is this a thing
```

Then we can run the public package!

```bash
npx @pagekey/blaze
TODO show the hello world output
```
