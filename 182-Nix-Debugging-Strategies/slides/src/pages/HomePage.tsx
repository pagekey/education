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
        <div className="mockup-code">
            <SyntaxHighlighter style={atom_one_dark} language={lang}>
                {children}
            </SyntaxHighlighter>
        </div>
    );
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
            <BigTitle>1. <code>nix repl</code></BigTitle>
        </Slide>,
        <Slide>
            <CodeBlock lang="sh">$ nix repl</CodeBlock>
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
            <CodeBlock lang="sh">cat /etc/hosts && echo $HELLO</CodeBlock>
        </Slide>,
        <Slide>
            <BigTitle>2. Using <code>default.nix</code></BigTitle>
        </Slide>,
        <Slide>
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
