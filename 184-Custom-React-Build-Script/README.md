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
