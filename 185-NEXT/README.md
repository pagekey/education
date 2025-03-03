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

## The Build Script (`npm run build`)

TODO

## The Dev Script (`npm run dev`)

TODO

## The Serve Script (`npm run serve`)

TODO

## Wrap-Up

TODO


```js
    // Create a folder to hold all the app's files.
    const targetDir = path.join(process.cwd(), projectName);
    
    if (fs.existsSync(targetDir)) {
      console.error("Error: Directory already exists!");
      process.exit(1);
    } else {
      console.log(`Creating project ${projectName}`);
      fs.mkdirSync(targetDir, { recursive: true });
      fs.mkdirSync(path.join(targetDir, "src"), { recursive: true });
      fs.mkdirSync(path.join(targetDir, "public"), { recursive: true });
      fs.writeFileSync(
        path.join(targetDir, "package.json"),
        JSON.stringify({
          name: projectName,
          version: "1.0.0",
        }),
        null,
        2,
      );
      execSync(`cd ${targetDir} && npm install esbuild react react-dom`, { stdio: "inherit" });
      console.log("Project setup complete!");
    }
```

TODO: move this whole section to the next video
## 5. Custom Build Script

There are a few problems with how this currently works. (1) have to copy-paste our thing (2) it would be nice to watch files and rebuild on change (3) it would be nice not to have to rely on Python to host these files on a dev server. Let's fix all that nonsense now.

First, create a `scripts/` folder:

```bash
mkdir scripts
```

Now edit `scripts/build.mjs` with the following:

```js
TODO
```

Finally, update `package.json` to invoke our script:

```js
  "scripts": {
    "build": "esbuild src/index.tsx --loader:.tsx=tsx --bundle --outfile=dist/bundle.js",
  }
```

With this setup, our `npm run build` command is equivalent to the `npx esbuild` command we ran above. The only difference is that we're already in the middle of a Node.js script, so the possibilities of what we can do are endless! Now we'll tackle each of those three ergonomic problems we noted above one at a time.


### 5a. Add copy of index script

TODO


### 5b. Add watch via chokidar

TODO


### 5c. Local Dev Server

TODO

Add local dev server via express? or something more lightweight (find node-based alt to python3 -m http.server)


## Future Work

In a future post, we'll look into the other ways you can render React components for different use cases. While calling `createRoot` and `render` is the simplest, two other popular use cases are Server-Side Rendering (SSR), where as many elements as possible are created on the server and then "hydrated" on the client-side, or Static Site Generation (SSG), when the entire React app is rendered into static HTML that can be loaded anywhere.

I would like to create a simple framework that saves some steps and allows people to use this barebones "from scratch" method as a starting point for their projects. Rather than being tailored to a specific use-case, it will be a framework designed to be completely repurposed. Perhaps it can use the same approach as [Shadcn]() (TODO: link to shad), which encourages users to copy-and-paste components instead of installing a versioned framework that can break (it encourages the users to OWN the starting point provided by the framework and customize it to be their own).


## Wrap-Up

TODO thanks



---
original notes:

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

tsconfig:
```json
{
    "compilerOptions": {
        "target": "esnext",
        "module": "esnext",
        "jsx": "react",
        "esModuleInterop": true,
        "skipLibCheck": true
    },
    "include": [
        "src/**/*.ts",
        "src/**/*.tsx"
    ]
}
```
