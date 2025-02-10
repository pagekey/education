import React from "react";
import { useEffect } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import atom_one_dark from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark';
import { useSlideClick } from "../hooks/SlideClickContext";
import Slide from "../components/Slide";


function BigTitle({ children }: { children?: any }) {
    return (
        <div>
            <h1 className="text-center py-6 text-8xl font-extrabold dark:text-white">
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
function CodeBlock({ lang, children }: { lang: string, children?: any }) {
    useEffect(() => {
        // TODO add typing effect
    }, []);

    return (
        <div className="mockup-code my-4">
            <SyntaxHighlighter style={atom_one_dark} language={lang}>
                {children}
            </SyntaxHighlighter>
        </div>
    );
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
            <BigTitle>Nix Debugging Strategies</BigTitle>
            <PageKeyLogo />
        </Slide>,
        <Slide>
            <BigTitle>Overview</BigTitle>
            <h1 className="text-center py-6 text-7xl font-extrabold dark:text-white">
                1. <code>nix repl</code>
            </h1>
            <h1 className="text-center py-6 text-7xl font-extrabold dark:text-white">
                2. Using <code>default.nix</code>
            </h1>
            <h1 className="text-center py-6 text-7xl font-extrabold dark:text-white">
                3. Clearing Cache with Surgical Precision
            </h1>
        </Slide>,
        <Slide>
            <BigTitle>1. <code>nix repl</code></BigTitle>
        </Slide>,
        <Slide>
            <CodeBlock lang="sh">$ nix repl</CodeBlock>
            <CodeBlock lang="sh">

                {`
Welcome to Nix 2.18.8. Type :? for help.

nix-repl> 
                `}
            </CodeBlock>
            <CodeBlock lang="nix">
                {`
pkgs = import <nixpkgs>{}
defaultNix = builtins.fetchurl {
  url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/176-Nix-Package-C/sample-app-c/default.nix";
  sha256 = "sha256:05357l33rllpyw2479rb0i06mi18aqm3dn20hrywmi3zi0a6q6a1";
}
pkgs.callPackage defaultNix
pkgs.callPackage defaultNix { }
                  `}
            </CodeBlock>
            <Arrow x={325} y={440} />
        </Slide>,
        <Slide>
            <BigTitle>2. Using <code>default.nix</code></BigTitle>
        </Slide>,
        <Slide>
            <CodeBlock lang="sh">$ vi default.nix</CodeBlock>
            <CodeBlock lang="nix">
                {`
{ pkgs ? import <nixpkgs> { } }:
let
  defaultNix = builtins.fetchurl {
    url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/176-Nix-Package-C/sample-app-c/default.nix";
    sha256 = "sha256:05357l33rllpyw2479rb0i06mi18aqm3dn20hrywmi3zi0a6q6a1";
  };
  buildPackageLambda = pkgs.callPackage defaultNix;
  theBuiltPackage = buildPackageLambda { };
in
  theBuildPackage
                `}
            </CodeBlock>
            <CodeBlock lang="sh">$ nix-build</CodeBlock>
            <CodeBlock lang="sh">TODO paste output</CodeBlock>
        </Slide>,
        <Slide>
            <BigTitle>3. Clearing Cache with Surgical Precision</BigTitle>
        </Slide>,
        <Slide>
            <CodeBlock lang="nix">
                {`     
$ nix repl
nix-repl> builtins.fetchurl {
                url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/178-Nix-Package-Python/sample-app-python/default.nix";
                    sha256 = "sha256:0mhjp9ig4g4wahkkrncpq5bc3f6bcnkg5qpa54dsyp0r3s669hbz";
                } 
"/nix/store/4sn1xmgw01xz3w0ln0f3qwacm6yilidf-default.nix"
                `}
            </CodeBlock>
            <CodeBlock lang="nix">
                {`
nix-store --delete /nix/store/4sn1xmgw01xz3w0ln0f3qwacm6yilidf-default.nix
                `}
            </CodeBlock>
            <CodeBlock lang="sh">TODO paste output</CodeBlock>
        </Slide>
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
