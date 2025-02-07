import React from "react";
import { useEffect, useState } from "react";


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
function Slide({ children }: { children?: any }) {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            {children}
        </div>
    );
}
function CodeBlock({ children }: { children?: any }) {
    useEffect(() => {
        console.log("rend");
    }, []);

    return (
        <div className="mockup-code">
            <pre data-prefix="$">{children}</pre>
        </div>
    );
}

export default function HomePage() {
    const [slide, setSlide] = useState<number>(0);
    const prevSlide = () => {
        setSlide(slide => slide > 0 ? slide - 1 : slide);
    };
    const nextSlide = () => {
        setSlide(slide => slide < slides.length ? slide + 1 : slide);
    };

    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key == "ArrowLeft") {
                prevSlide();
            } else {
                nextSlide();
            }
        });
        document.addEventListener("click", () => {
            nextSlide();
        });
    }, []);

    let slides = [
        <Slide>
            <BigTitle>Nix Debugging Strategies</BigTitle>
            <PageKeyLogo />
        </Slide>,
        <Slide>
            <BigTitle>1. <code>nix repl</code></BigTitle>
        </Slide>,
        <Slide>
            <CodeBlock>
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
        </Slide>,
        <Slide>
            <BigTitle>2. Using <code>default.nix</code></BigTitle>
        </Slide>,
        <Slide>
            <CodeBlock>
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
            <CodeBlock>
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

    return (
        <>
            {slides[slide]}
        </>
    );
}
