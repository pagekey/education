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
            <MediumText>TODO fill this out</MediumText>
        </Slide>,
        <Slide>
            <BigText>4. Create <code>index.html</code>, run in browser</BigText>
        </Slide>,
        <Slide>
            <MediumText>TODO fill this out</MediumText>
        </Slide>,
        <Slide>
            <BigText>5. Create <code>npm run build</code> / <code>npm run dev</code> scripts</BigText>
        </Slide>,
        <Slide>
            <MediumText>TODO fill this out</MediumText>
        </Slide>,
        <Slide>
            <BigText>That's it!</BigText>
            <MediumText>TODO fill this out</MediumText>
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
