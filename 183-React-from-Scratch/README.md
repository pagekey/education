# React from Scratch

Starter commands:

```
mkdir my-app
echo node_modules >> .gitignore
echo dist >> .gitignore
npm i esbuild
```

Edit `package.json` and add:

```
  "scripts": {
    "build": "esbuild src/index.tsx --loader:.tsx=tsx --bundle --outfile=dist/bundle.js",
    "dev": "npm run build -- --sourcemap --watch"
  }
```

Set up dirs:

```
mkdir src public
```

Create index.tsx:

```
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
