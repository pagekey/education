# React from Scratch

Frameworks are great, but they can be clunky and slow. On the other hand, using vanilla JavaScript really doesn't cut it - React gives you the best of both worlds by keeping everything in one cohesive piece (behavior, display, content). How can we use React on our own, without someone else's framework? What are the moving parts, and how does it work? What happens if we strip it to the absolute minimum, removing any of the extra stuff that frameworks like Next.js build in for us?

As it turns out, with a little noodling around with Node.js scripts, you can get an extreme barebones version of React to compile using `esbuild`, a TypeScript compiler that is known for being lightweight and fast.


## Overview

In this post, we'll

1. Start from nothing more than an empty directory.
2. Create a simple React component (with import/hooks!).
3. Compile the `.tsx` file into a `.js` file.
4. Create an `index.html` file to render the compiled `.js`.
5. Clean things up / automate things by using a custom build script.
6. Future Work

## 1. Setting Up

Before we do anything, create an empty folder for us to work out of. No frameworks, no magic - we're starting from an empty canvas!

```bash
mkdir my-app
cd my-app
mkdir src dist
```

If you already have Node installed on your system, we're good to go. If you're using Nix or NixOS, you can dump the following into `shell.nix` and run `nix-shell` to ensure you have the `node` and `npm` executables installed:

```nix
{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
    buildInputs = with pkgs; [
        nodejs
    ];
}
```


## 2. Creating React Components

Let's create two source files for React - one that imports the other. We'll also make use of the `useState` function to show that React hooks work.

Save the following into `src/index.tsx`:

```tsx
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './HomePage';

const App = () => {
    const [something, setSomething] = useState<string>("something");
    return <div><HomePage /> {something}</div>;
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
```

Now create the `HomePage` component in `src/HomePage.tsx`, which we'll keep as simple as possible:

```tsx
import React from 'react';


export default function HomePage() {
  return (
    <>
      Hello world!
    </>
  )
}
```

Note that with this method, the `React` import must be added to every single source file, even if unused, because having components in-scope implicitly uses that import.

While working on this, I found that if you mess up the details of the compilation, you end up with errors when you try to start using hooks - so best to start by using them from the very beginning! Similarly, we'll see some stumbling blocks that arise when using imports (and how to resolve those issues).

As you can see, we've included the code that injects the Typescript into an existing "root" element in the DOM. This is something usually abstracted away by a framework, but in our case, we can see it in all its glory. Later, we'll talk more about other injection techniques for SSGs or SSR (see "Future Work" below).


## 3. Compile with the Esbuild CLI

We need three packages to get this done. Let's install them now:

```bash
npm install esbuild react react-dom
```

This will create `package.json` with `esbuild` as a dependency. It will also create the `node_modules` folder. Let's make sure we don't accidentally commit `node_modules` to Git, which is a disaster to undo:

```bash
echo node_modules/ >> .gitignore
```

We should also ignore the `dist/` folder, which is where we'll be putting our compiled JavaScript code:

```bash
echo dist/ >> .gitignore
```

Now we're ready to compile the component! Just run:

```bash
npx esbuild src/index.tsx
```

As you can see, the compilation works! It prints directly to our terminal and we can easily inspect the output.

There's one problem though - do you see it?

Where is our "Hello World" message from the imported component?

As it turns out, it's not there, because `esbuild` is expecting you to compile that component separately.

It would be much easier if it pulled in all of the imported components into a single file. Thankfully, `esbuild` provides the `--bundle` flag to do just that:

```bash
npx esbuild src/index.tsx --bundle
```

As you can see, the output is **much** longer now, because it bundled React itself into the script, but you should also be able to find `function HelloWorld` in the mix now too. Excellent!

Outputting to the console is great, but not particularly useful. Let's add one more `esbuild` flag to output to a file:

```bash
npx esbuild src/index.tsx --bundle --outfile=dist/bundle.js
```

Great. We have our compiled `bundle.js` - let's do something useful with it.


## 4. Create `index.html` and view rendered component

Now that we've compiled the TypeScript React component into plain old JavaScript, how do we see it in action?

We'll need to run it in a browser. The simplest way to do that is to write a dead-simple webpage using `index.html` and have it import our JavaScript, which will inject our component into the element with the `id` of `root`.

Run this command to create a `public/` directory:

```bash
mkdir public/
```

Next open `public/index.html` and fill it with the following:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React App</title>
</head>
<body>
  <div id="root"></div>

  <script src="bundle.js"></script>
</body>
</html>
```

These next few steps will be a little clunky, but don't worry - we'll fix it soon.

First, let's copy `index.html` into the `dist/` folder. Note that we don't want to store `index.html` there to begin with because `dist/` is in `.gitignore`, so we may accidentally wipe it.

```bash
cp public/index.html dist/
```

Next, the easiest hack to run a quick dev server is to use Python. If you have Python 3 installed on your system, you can run:

```bash
python3 -m http.server -d dist/
```

Visit `http://localhost:8000` in your browser and you should see our Hello World message!

If you only have Python 2 (for some crazy reason), you can use `python -m SimpleHTTPServer` instead. And if you have neither, hold on just a bit longer - we're going to come up with a better solution in the next section!


## 5. Hacky Npm Build Script

Let's save our current build process into our `package.json` so that we can save some typing. Add a `scripts` section after the auto-added `dependencies` key:

```json
{
  "dependencies": {
    // ... omitted for brevity
  },
  "scripts": {
    "build": "esbuild src/index.tsx --loader:.tsx=tsx --bundle --outfile=dist/bundle.js",
  }
}
```

Now, rather than typing that entire `npx` command, you can just run `npm run build` and it has the same effect!

That saved **some** typing, but wouldn't it be great if you didn't have to type anything after saving a file, and it just automatically re-compiled? As it turns out, `esbuild` has the `--watch` flag built-in that can help with this! We'll also throw in the `--sourcemap` flag to help with debugging. We can re-use our `npm run build` command to create a slightly different `npm run dev` command:

```json
{
  "dependencies": {
    // ... omitted for brevity
  },
  "scripts": {
    "build": "esbuild src/index.tsx --loader:.tsx=tsx --bundle --outfile=dist/bundle.js",
    "dev": "npm run build -- --watch --sourcemap"
  }
}
```

Try it out - run `npm run dev`, then go edit `src/index.tsx` and see what happens.

One last painful part of our setup is the need to manually copy `public/index.html` into place. Let's hack a solution for that into what we already have:

```js
{
  "dependencies": {
    // ... omitted for brevity
  },
  "scripts": {
    "build": "cp public/index.html dist/ && esbuild src/index.tsx --loader:.tsx=tsx --bundle --outfile=dist/bundle.js",
    "dev": "npm run build -- --watch --sourcemap"
  }
}
```

There we go - a duct-taped React framework! It's not pretty, but it works!


## Wrap-Up

As you can tell, using CLIs for everything gets very messy. Keep your eyes peeled for our next post, where we'll create our own custom build script to streamline these things and open the door to infinite customization.

In a post after that, we can dive more deeply into how to use React for Server-Side Rendering (SSR) and Static Site Generation (SSG).

Thanks for reading!
