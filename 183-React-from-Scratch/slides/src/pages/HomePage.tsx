import React from "react";
import { useEffect } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import atom_one_dark from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark';
import { useSlideClick } from "../hooks/SlideClickContext";
import Slide from "../components/Slide";


function BigText({ children, className }: { className?: string, children?: any }) {
    return (
        <div className={className}>
            <h1 className="text-center py-6 text-8xl font-extrabold dark:text-white">
                {children}
            </h1>
        </div>
    )
}
function MediumText({ children, className }: { className?: string, children?: any }) {
    return (
        <div className={className}>
            <h1 className="text-center py-6 text-6xl font-extrabold dark:text-white">
                {children}
            </h1>
        </div>
    )
}
function SmallText({ children, className }: { className?: string, children?: any }) {
    return (
        <div className={className}>
            <h1 className="text-center py-6 text-4xl font-extrabold dark:text-white">
                {children}
            </h1>
        </div>
    )
}
function PageKeyLogo() {
    return (
        <div className="fixed bottom-5 w-full flex justify-center">
            <div className="w-30">
                <img className="rounded-xl" src="/logo.png" />
                <div className="bold font-bold text-center">
                    PageKey
                </div>
            </div>
        </div>
    );
}
function CodeBlock({ className, lang, children }: { className?: string, lang: string, children?: any }) {
    useEffect(() => {
        // TODO add typing effect
    }, []);

    return (
        <div className={`mockup-code my-4 ${className ? className : ""}`}>
            <SyntaxHighlighter style={atom_one_dark} language={lang}>
                {children}
            </SyntaxHighlighter>
        </div>
    );
}
function MediumCode({className, lang, children, file}: {className?: string, lang: string, file?: string, children?: any}) {
    return (
        <div className={`border border-black text-4xl  ${className ? className : ""}`}>
            {file ? (
                <div className="bg-black text-2xl p-1">
                    <code>
                        {file}
                    </code>
                </div>
            ) : ""}
            <SyntaxHighlighter style={atom_one_dark} language={lang}>
                {children}
            </SyntaxHighlighter>
        </div>
    )
    // return <CodeBlock className="text-4xl" lang={lang}>{children}</CodeBlock>
}
function Arrow({x, y}: {x: number, y: number}) {
    return (
        <div className="fixed text-red-600 text-5xl" style={{top: y, left: x}}>
            <svg xmlns="http://www.w3.org/2000/svg"  width="75"  height="75"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-arrow-big-right-line"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12.089 3.634a2 2 0 0 0 -1.089 1.78l-.001 2.586h-4.999a1 1 0 0 0 -1 1v6l.007 .117a1 1 0 0 0 .993 .883l4.999 -.001l.001 2.587a2 2 0 0 0 3.414 1.414l6.586 -6.586a2 2 0 0 0 0 -2.828l-6.586 -6.586a2 2 0 0 0 -2.18 -.434l-.145 .068z" /><path d="M3 8a1 1 0 0 1 .993 .883l.007 .117v6a1 1 0 0 1 -1.993 .117l-.007 -.117v-6a1 1 0 0 1 1 -1z" /></svg>
        </div>
    )
}

export default function HomePage() {
    const { slideState } = useSlideClick();
    const { slide } = slideState;

    let slides = [
        <Slide>
            <BigText>Most people</BigText>
            <MediumText>use pre-built React frameworks.</MediumText>
            <MediumText>They take their pick and live with the consequences.</MediumText>
        </Slide>,
        <Slide>
            <MediumText>"Let me get a number 3."</MediumText>
            <MediumText>"I'll have a Create-React-App please."</MediumText>
            <MediumText>"Can I have Next.js with a side of Tailwind?"</MediumText>
        </Slide>,
        <Slide>
            <BigText>But it doesn't have to be like that.</BigText>
            <BigText>Take Back Tech.</BigText>
        </Slide>,
        <Slide>
            <BigText>We can build it ourselves</BigText>
            <BigText>and have full control.</BigText>
        </Slide>,
        <Slide>
            <BigText>React from Scratch</BigText>
            <PageKeyLogo />
        </Slide>,
        <Slide>
            <SmallText>First of all, why bother?</SmallText>
        </Slide>,
        <Slide>
            <MediumText>
            <img className="rounded-xl w-20 m-auto mb-4" src="/logo.png" />
                PageKey:
            </MediumText>
            <BigText className="mb-25">Take Back Tech</BigText>
            <MediumText>1. Own the infrastructure. 🖥️</MediumText>
            <MediumText>2. Write/customize your own software. 💿</MediumText>
            <MediumText>3. Help others do the same. 🫂</MediumText>
        </Slide>,
        <Slide>
            <SmallText className="text-red-200">Imagine: Apple decides to start charging for emojis.</SmallText>
            <SmallText className="text-green-200">The outrage is unbelievable.</SmallText>
            <SmallText className="text-blue-200">But they're doing it anyway.</SmallText>
            <SmallText className="text-red-400">Stocks are falling. Investors are angry.</SmallText>
            <SmallText className="text-red-400">But they're doing it anyway.</SmallText>
            <SmallText className="text-red-400">What are you doing?</SmallText>
            <SmallText>What the solution? Never update your phone?</SmallText>
            <SmallText>Better: refuse to use Apple.</SmallText>
            <SmallText>Own the stack so you don't get vendor-locked and vendor-bullied.</SmallText>
        </Slide>,
        <Slide>
            <BigText>Android, you're not safe either.</BigText>
            <SmallText>Google is watching.</SmallText>
            <BigText>👁️</BigText>
        </Slide>,
        <Slide>
            <SmallText>btw:</SmallText>
            <SmallText>these slides are made with pure react too.</SmallText>
            <SmallText>NO FRAMEWORK!</SmallText>
            <SmallText>I'll cover how to do slides specifically in a future video.</SmallText>
        </Slide>,
        <Slide>
            <SmallText>PS: I usually edit out all the silence for these videos</SmallText>
            <SmallText>(to keep them shorter)</SmallText>
            <SmallText>Based on feedback, I'm going to slow down a bit and leave it in.</SmallText>
            <SmallText>Let me know if you think it's better!</SmallText>
        </Slide>,
        <Slide>
            <MediumText>Blog article/source code is on GitHub:</MediumText>
            <SmallText className="text-blue-400">github.com/pagekey/education</SmallText>
            <SmallText className="text-yellow-200">Folder: 183-React-From-Scratch</SmallText>
        </Slide>,
        <Slide>
            <BigText>Overview</BigText>
            <MediumText>1. Initial Setup (from scratch)</MediumText>
            <MediumText>2. Simple React Components</MediumText>
            <MediumText>3. Compile with Esbuild</MediumText>
            <MediumText>4. Create <code>index.html</code>, run in browser</MediumText>
            <MediumText>5. Create <code>npm run build</code> / <code>npm run dev</code> scripts</MediumText>
        </Slide>,
        <Slide>
            <BigText>1. Initial Setup (from scratch)</BigText>
        </Slide>,
        <Slide>
            <MediumText>Start with an empty folder:</MediumText>
            <MediumCode lang={"sh"}>{`
$ mkdir my-app

$ cd my-app

$ mkdir src dist
            `}</MediumCode>
            <Arrow x={570} y={415} />
            <Arrow x={570} y={415+80} />
            <Arrow x={570} y={415+80+80} />
        </Slide>,
        <Slide>
            <MediumText>Make sure you have Node installed. For Nix:</MediumText>
            <MediumCode lang={"nix"} file="shell.nix">{`
{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
    buildInputs = with pkgs; [
        nodejs
    ];
}
            `}</MediumCode>
        </Slide>,
        <Slide>
            <BigText>2. Simple React Components</BigText>
        </Slide>,
        <Slide>
            <MediumText>Let's make two components.</MediumText>
            <MediumText>One will import the other</MediumText>
            <MediumText>and use React hooks (useState).</MediumText>
        </Slide>,
        <Slide>
            <MediumText>First component:</MediumText>
            <MediumCode lang={"tsx"} file="src/index.tsx">{`
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
            `}</MediumCode>
            <Arrow x={35} y={340} />
            <Arrow x={35} y={340+80} />
            <Arrow x={110} y={340+120} />
            <Arrow x={140} y={340+80*2} />
            <Arrow x={35} y={340+80*3+40} />
        </Slide>,
        <Slide>
            <MediumText>Second component:</MediumText>
            <MediumCode lang={"tsx"} file="src/HomePage.tsx">{`
import React from 'react';


export default function HomePage() {
  return (
    <>
      Hello world!
    </>
  )
}
            `}</MediumCode>
            <Arrow x={390} y={340} />
            <Arrow x={390} y={340+120} />
        </Slide>,
        <Slide>
            <BigText>3. Compile with Esbuild</BigText>
        </Slide>,
        <Slide>
            <MediumText>We need three packages to get this done. Let's install them now:</MediumText>
            <MediumCode lang={"sh"}>{`npm install esbuild react react-dom`}</MediumCode>
        </Slide>,
        <Slide>
            <MediumText>This will create `package.json` with `esbuild` as a dependency. It will also create the `node_modules` folder. Let's make sure we don't accidentally commit `node_modules` to Git, which is a disaster to undo:</MediumText>
            <MediumCode lang={"sh"}>{`echo node_modules/ >> .gitignore`}</MediumCode>
            <MediumText>We should also ignore the `dist/` folder, which is where we'll be putting our compiled JavaScript code:</MediumText>
            <MediumCode lang={"sh"}>{`echo dist/ >> .gitignore`}</MediumCode>
        </Slide>,
        <Slide>
            <MediumText>Now we're ready to compile the component! Just run:</MediumText>
            <MediumCode lang="sh">npx esbuild src/index.tsx</MediumCode>
            <MediumText>As you can see, the compilation works! It prints directly to our terminal and we can easily inspect the output.</MediumText>
        </Slide>,
        <Slide>
            <MediumText>There's one problem though - do you see it?</MediumText>
            <MediumText>Where is our "Hello World" message from the imported component?</MediumText>
            <MediumText>As it turns out, it's not there, because `esbuild` is expecting you to compile that component separately.</MediumText>
        </Slide>,
        <Slide>
            <MediumText>It would be much easier if it pulled in all of the imported components into a single file. Thankfully, `esbuild` provides the `--bundle` flag to do just that:</MediumText>
            <MediumCode lang="sh">npx esbuild src/index.tsx --bundle</MediumCode>
            <MediumText>As you can see, the output is **much** longer now, because it bundled React itself into the script, but you should also be able to find `function HelloWorld` in the mix now too. Excellent!</MediumText>
        </Slide>,
        <Slide>
            <MediumText>Outputting to the console is great, but not particularly useful. Let's add one more `esbuild` flag to output to a file:</MediumText>
            <MediumCode lang="sh">npx esbuild src/index.tsx --bundle --outfile=dist/bundle.js</MediumCode>
            <MediumText>Great. We have our compiled `bundle.js` - let's do something useful with it.</MediumText>
        </Slide>,
        <Slide>
            <MediumText>We've compiled the TypeScript React component into plain old JavaScript. how do we see it in action?</MediumText>
            <MediumText>Now how do we see it in action?</MediumText>
        </Slide>,
        <Slide>
            <MediumText>We'll need to run it in a browser. The simplest way to do that is to write a dead-simple webpage using `index.html` and have it import our JavaScript, which will inject our component into the element with the `id` of `root`.</MediumText>
            <MediumText>The simplest way: create a barebones <code>index.html</code> and have it import our JavaScript, which will inject our component into the element with the `id` of `root`.</MediumText>
            <MediumText>to import our compiled JavaScript.</MediumText>
        </Slide>,
        <Slide>
            <MediumText>Run this command to create a `public/` directory:</MediumText>
            <MediumCode lang="sh">{`mkdir public/`}</MediumCode>
        </Slide>,
        <Slide>
            <MediumText>Next open `public/index.html` and fill it with the following:</MediumText>
            <MediumCode lang="html">{`
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
            `}</MediumCode>
        </Slide>,
        <Slide>
            <MediumText>These next few steps will be a little clunky, but don't worry - we'll fix it soon.</MediumText>
        </Slide>,
        <Slide>
            <MediumText>First: copy <code>index.html</code> into the <code>dist/</code> folder. Note that we don't want to store `index.html` there to begin with because `dist/` is in `.gitignore`, so we may accidentally wipe it.</MediumText>
            <MediumText>Note: don't store <code>index.html</code> in <code>dist/</code>.</MediumText>
            <MediumCode lang="sh">{`cp public/index.html dist/`}</MediumCode>
        </Slide>,
        <Slide>
            <MediumText>Next: run a quick dev server via Python3:</MediumText>
            <MediumCode lang="sh">{`python3 -m http.server -d dist/`}</MediumCode>
            <MediumText>Visit <code>http://localhost:8000</code> in your browser and you should see our Hello World message!</MediumText>
        </Slide>,
        <Slide>
            <MediumText>If you only have Python 2 (you dinosaur):. And if you have neither, hold on just a bit longer - we're going to come up with a better solution in the next section!</MediumText>
            <MediumCode lang="sh">{`python -m SimpleHTTPServer`}</MediumCode>
            <MediumText>No Python? Hang on.</MediumText>
            <MediumText>Node-based solution in the next video.</MediumText>
        </Slide>,
        <Slide>
            <BigText>5. Create <code>npm run build</code> / <code>npm run dev</code> scripts</BigText>
        </Slide>,
        <Slide>
            <MediumText>Let's save some typing. our current build process into our `package.json` so that we can save some typing. Add a `scripts` section after the auto-added `dependencies` key:</MediumText>
            <MediumText>Add scripts to <code>package.json</code>:</MediumText>
            <MediumCode lang="json">{`
{
  "dependencies": {
    // ... omitted for brevity
  },
  "scripts": {
    "build": "esbuild src/index.tsx --loader:.tsx=tsx --bundle --outfile=dist/bundle.js"
  }
}
            `}</MediumCode>
        </Slide>,
        <Slide>
            <MediumText>Now you can simply type:</MediumText>
            <MediumCode lang="sh">{`npm run build`}</MediumCode>
        </Slide>,
        <Slide>
            <MediumText>What if it rebuilt automatically when you save a file?That saved **some** typing, but wouldn't it be great if you didn't have to type anything after saving a file, and it just automatically re-compiled? As it turns out, `esbuild` has the `--watch` flag built-in that can help with this! We'll also throw in the `--sourcemap` flag to help with debugging. We can re-use our `npm run build` command to create a slightly different `npm run dev` command:</MediumText>
            <MediumText>With esbuild, it's easy! Add <code>--watch</code> to the end:</MediumText>
            <MediumCode lang="json">{`
{
  "dependencies": {
    // ... omitted for brevity
  },
  "scripts": {
    "build": "esbuild src/index.tsx --loader:.tsx=tsx --bundle --outfile=dist/bundle.js",
    "dev": "npm run build -- --watch --sourcemap"
  }
}
            `}</MediumCode>
        </Slide>,
        <Slide>
            <MediumText>Now you can simply type:</MediumText>
            <MediumCode lang="sh">{`npm run dev`}</MediumCode>
            <MediumText>And it will watch for when you save files.</MediumText>
            <MediumText>Try it out - run <code>npm run dev</code>, then go edit/save <code>src/index.tsx</code>.</MediumText>
        </Slide>,
        <Slide>
            <MediumText>If you also add the <code>--minify</code> flag, the built JavaScript could get up to 10x smaller.</MediumText>
        </Slide>,
        <Slide>
            <MediumText>One pain: Manually copying <code>index.html</code>.</MediumText>
            <MediumText>The fix: Add the copy to our script!</MediumText>
            <MediumCode lang="json">{`
{
  "dependencies": {
    // ... omitted for brevity
  },
  "scripts": {
    "build": "cp public/index.html dist/ && esbuild src/index.tsx --loader:.tsx=tsx --bundle --outfile=dist/bundle.js",
    "dev": "npm run build -- --watch --sourcemap"
  }
}
            `}</MediumCode>
            <Arrow x={570} y={415} />
        </Slide>,
        <Slide>
            <MediumText>There we go - a duct-taped React framework!</MediumText>
            <MediumText>It's not pretty, but it works!</MediumText>
        </Slide>,
        <Slide>
            <BigText>That's it!</BigText>
            <MediumText>1. Wrote simple React components.</MediumText>
            <MediumText>2. Compiled with Esbuild.</MediumText>
            <MediumText>3. Created <code>index.html</code>, ran in browser.</MediumText>
            <MediumText>4. Create <code>npm run build</code> / <code>npm run dev</code> scripts</MediumText>
        </Slide>,
        <Slide>
            <MediumText>Next post: custom build script (streamline, infinite customization)</MediumText>
            <MediumText>Later: React SSR, SSG</MediumText>
            <MediumText>Thanks for watching!</MediumText>
        </Slide>,
        <Slide>
            <BigText>Subscribe to Take Back Tech!</BigText>
            <SmallText>Weekly videos to learn new tech topics.</SmallText>
            <SmallText>Self-hosting.</SmallText>
            <SmallText>Rebuilding from scratch.</SmallText>
            <div>
                <BigText>See you there!</BigText>
                <img className="rounded-xl w-20 m-auto mt-8" src="/logo.png" />
            </div>
        </Slide>,
    ];
    if (slide >= 0 && slide < slides.length) {
        return (
            <>
                {slides[slide]}
            </>
        );
    } else {
        return (
            <Slide>
                <div>
                    Error: Slide {slide} out of bounds.
                </div>
            </Slide>
        );
    }
}
