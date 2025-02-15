# React from Scratch

Frameworks are great, but they can be clunky and slow. On the other hand, using vanilla JavaScript really doesn't cut it - React gives you the best of both worlds by keeping everything in one cohesive piece (behavior, display, content). How fast can we go with React? And what happens if we strip it to the absolute minimum, removing any of the extra stuff that frameworks like Next.js build in for us?

As it turns out, with a little noodling around with Node.js scripts, you can get an extreme barebones version of React to compile using `esbuild`, a TypeScript compiler that is known for being lightweight and fast.

## Overview

In this post, we'll

1. Start from nothing more than an empty directory.
2. Create a simple React component (with hooks!).
3. Compile the `.tsx` file into a `.js` file.
4. Create an `index.html` file to render the compiled `.js`.
5. Clean things up / automate things by using a custom build script.
6. Future Work

## 1. Setting Up

Before we do anything, create an empty folder for us to work out of. No frameworks, no magic - we're starting from an empty canvas!

```bash
mkdir my-app
cd my-app
mkdir src
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


## 2. Creating a React Component

Now let's create a simple React component so we can figure out how to compile it and display it in our browser:

```tsx
import { useState } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
    const [something, setSomething] = useState<string>("something");
    return <div>Hello, world! {something}</div>;
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
```

Create a file called `src/index.tsx` and save the above into it.

We could have made this simpler, but the fact that it includes a `useState` call is great, because it allows us to verify that React Hooks are working. While working on this, I found that if you mess up the details of the compilation, you end up with errors when you try to start using hooks - so best to start by using them from the very beginning!

As you can see, we've included the code that injects the Typescript into an existing "root" element in the DOM. This is something usually abstracted away by a framework, but in our case, we can see it in all its glory.


## 3. Compile with the Esbuild CLI

To install the `esbuild` package, run:

```bash
npm i esbuild
```

This will create `package.json` with `esbuild` as a dependency. It will also create the `node_modules` folder. Let's make sure we don't accidentally commit `node_modules` to Git, which is a disaster to undo:

```bash
echo node_modules/ >> .gitignore
```

Now we're ready to compile the component! Just run:

```bash
npx esbuild src/index.tsx --loader:.tsx=tsx --bundle --outfile=dist/bundle.js # TODO try to make sure this works
```

(TODO: explain --bundle with an example)

Examine output file. (note where it is, show how to open it, etc)


## 4. Create `index.html` and view rendered component

## 5. Custom Build Script




## Future Work

In a future post, we'll look into the other ways you can render React components for different use cases. While calling `createRoot` and `render` is the simplest, two other popular use cases are Server-Side Rendering (SSR), where as many elements as possible are created on the server and then "hydrated" on the client-side, or Static Site Generation (SSG), when the entire React app is rendered into static HTML that can be loaded anywhere.

I would like to create a simple framework that saves some steps and allows people to use this barebones "from scratch" method as a starting point for their projects. Rather than being tailored to a specific use-case, it will be a framework designed to be completely repurposed. Perhaps it can use the same approach as [Shadcn]() (TODO: link to shad), which encourages users to copy-and-paste components instead of installing a versioned framework that can break (it encourages the users to OWN the starting point provided by the framework and customize it to be their own).








---
original notes:

Edit `package.json` and add:

```
  "scripts": {
    "build": "esbuild src/index.tsx --loader:.tsx=tsx --bundle --outfile=dist/bundle.js",
    "dev": "npm run build -- --sourcemap --watch"
  }
```

Set up dirs:

```
mkdir public
```

Create index.html

```
TODO
```

```
npm run build
npm run dev
```

You have to manually copy index:

```
cp public/index.html dist/index.html
```

Open index.html in browser and voila! React.

Let's fix manual copy the CLI way:

## Custom Build Script

Now let's fix it properly - with our own build script:

TODO

Add `thing.jsx` to prove you can import other components:

```tsx
import React from 'react';


export default function Thing() {
    return (
        <>
            This is a thing.
        </>
    )
}

// in index.tsx:
import Thing from './thing';

const myfnc = () => <Thing />;
```
