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
function MediumCode({ className, lang, children, file }: { className?: string, lang: string, file?: string, children?: any }) {
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
function Arrow({ x, y }: { x: number, y: number }) {
    return (
        <div className="fixed text-red-600 text-5xl" style={{ top: y, left: x }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-arrow-big-right-line"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12.089 3.634a2 2 0 0 0 -1.089 1.78l-.001 2.586h-4.999a1 1 0 0 0 -1 1v6l.007 .117a1 1 0 0 0 .993 .883l4.999 -.001l.001 2.587a2 2 0 0 0 3.414 1.414l6.586 -6.586a2 2 0 0 0 0 -2.828l-6.586 -6.586a2 2 0 0 0 -2.18 -.434l-.145 .068z" /><path d="M3 8a1 1 0 0 1 .993 .883l.007 .117v6a1 1 0 0 1 -1.993 .117l-.007 -.117v-6a1 1 0 0 1 1 -1z" /></svg>
        </div>
    )
}

export default function HomePage() {
    const { slideState } = useSlideClick();
    const { slide } = slideState;

    let slides = [
        <Slide>
            <BigText>The worst thing ever</BigText>
            <SmallText>is when</SmallText>
            <MediumText>you make something cool</MediumText>
            <MediumText>but you can't share it with anyone.</MediumText>
        </Slide>,
        <Slide>
            <BigText>Software distribution is hard.</BigText>
            <BigText>But npm makes it easy.</BigText>
        </Slide>,
        <Slide>
            <MediumText>In just 5 steps,</MediumText>
            <MediumText>we're going to create a simple CLI</MediumText>
            <MediumText>and distribute it, so that</MediumText>
            <MediumText>anyone in the entire world</MediumText>
            <MediumText>can type a few short keystrokes to run our code.</MediumText>
            <MediumText>Sound cool?</MediumText>
        </Slide>,
        <Slide>
            <BigText>How to Publish an NPM Package</BigText>
            <PageKeyLogo />
        </Slide>,
        <Slide>
            <SmallText>Real quick, what's the point of this anyway?</SmallText>
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
            <BigText className="text-red-200">Imagine: Apple decides to start charging for emojis.</BigText>
            <SmallText className="text-green-200">The outrage is unbelievable.</SmallText>
            <SmallText className="text-blue-200">But they're doing it anyway.</SmallText>
        </Slide>,
        <Slide>
            <MediumText>Have you ever thought about how</MediumText>
            <MediumText>you don't have control over the software on your phone?</MediumText>
            <MediumText>Well, too late now!</MediumText>
        </Slide>,
        <Slide>
            <MediumText>You have two choices:</MediumText>
            <MediumText>1. Never update your phone, or</MediumText>
            <MediumText>2. Just don't use Apple - go open source!</MediumText>
            <SmallText>Own the stack so you don't get vendor-locked and vendor-bullied.</SmallText>
        </Slide>,
        <Slide>
            <BigText>Android, you're not safe either.</BigText>
            <SmallText>Google is watching.</SmallText>
            <BigText>👁️</BigText>
        </Slide>,
        <Slide>
            <MediumText>Blog article/source code is on GitHub:</MediumText>
            <SmallText className="text-blue-400">github.com/pagekey/education</SmallText>
            <SmallText className="text-yellow-200">Folder: 184-Publish-NPM-Package</SmallText>
        </Slide>,
        <Slide>
            <BigText>Overview</BigText>
            <MediumText>1. Create the Package</MediumText>
            <MediumText>2. Add the CLI</MediumText>
            <MediumText>3. Publish to npm.org</MediumText>
            <MediumText>4. Make a change and bump version</MediumText>
            <MediumText>5. Try it out</MediumText>
        </Slide>,
        <Slide>
            <BigText>1. Create the Package</BigText>
        </Slide>,
        <Slide>
            <MediumText>Start with an empty folder:</MediumText>
            <MediumCode lang={"sh"}>{`
$ mkdir blaze

$ cd blaze
        `}</MediumCode>
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
            <MediumText>Also for Nix: add this to <code>.npmrc</code> so that <code>npm link</code> works:</MediumText>
            <MediumCode lang={"nix"} file="~/.npmrc">{`
prefix=~/.npm
            `}</MediumCode>
        </Slide>,
        <Slide>
            <BigText>2. Add the CLI</BigText>
        </Slide>,
        <Slide>
            <MediumText>Install the <code>commander</code> package:</MediumText>
            <MediumCode lang={"sh"}>{`
$ npm install commander
            `}</MediumCode>
        </Slide>,
        <Slide>
            <MediumText>Add <code>src/index.mjs</code>:</MediumText>
            <MediumCode lang={"javascript"} file="src/index.mjs">{`
#!/usr/bin/env node

import { program } from "commander";

program
  .command("new [project-name]")
  .description("Create a new project")
  .action((projectName = "my-project") => {
    console.log("Hello world from Blaze.");
  });

program.parse(process.argv);
            `}</MediumCode>
            <SmallText>Don't forget the shebang!</SmallText>
        </Slide>,
        <Slide>
            <MediumText>Add the "bin" section to package.json:</MediumText>
            <MediumCode lang="json" file="package.json">{`
{
  ...
  "bin": {
    "blaze": "./src/index.mjs"
  }
}
            `}</MediumCode>
        </Slide>,
        <Slide>
            <MediumText>Make our script executable:</MediumText>
            <MediumCode lang={"sh"}>{`
$ chmod +x src/index.mjs
            `}</MediumCode>
        </Slide>,
        <Slide>
            <MediumText>Use "npm link" to simulate installation:</MediumText>
            <MediumCode lang={"sh"}>{`
$ npm link

added 1 package, and audited 3 packages in 1s

found 0 vulnerabilities
            `}</MediumCode>
        </Slide>,
        <Slide>
            <MediumText>See it in action!</MediumText>
            <MediumCode lang={"sh"}>{`
$ npx blaze new

Hello world from Blaze.
            `}</MediumCode>
        </Slide>,
        <Slide>
            <BigText>3. Publish to npm.org</BigText>
        </Slide>,
        <Slide>
            <MediumText>You can publish a "scoped" package under your username:</MediumText>
            <MediumText><code>@username/your-package</code></MediumText>
            <MediumText>Start by making an account on npmjs.com.</MediumText>
        </Slide>,
        <Slide>
            <MediumText>Then, run <code>npm login</code>:</MediumText>
            <MediumCode lang={"sh"}>{`
$ npm login
npm notice Log in on https://registry.npmjs.org/
Login at:
https://www.npmjs.com/login?next=/login/cli/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Press ENTER to open in the browser...
            `}</MediumCode>
        </Slide>,
        <Slide>
        <MediumText>Finally, upload the package!</MediumText>
        <MediumCode lang={"sh"}>{`
$ npm publish --access public
...
npm notice Publishing to https://registry.npmjs.org/ with tag latest and public access
+ @pagekey/blaze@1.0.0
        `}</MediumCode>
    </Slide>,
        <Slide>
            <BigText>4. Make a change and bump version</BigText>
        </Slide>,
        <Slide>
        <MediumText>Edit <code>src/index.mjs</code> to make it more polite:</MediumText>
        <MediumCode lang={"javascript"} file="src/index.mjs">{`
#!/usr/bin/env node

import { program } from "commander";

program
    .command("new [project-name]")
    .description("Create a new project")
    .action((projectName = "my-project") => {
        console.log("Hello world from Blaze.");
        console.log("Hope you have a great day!");
    });

program.parse(process.argv);
        `}</MediumCode>
    </Slide>,
        <Slide>
        <MediumText>Now bump the version:</MediumText>
        <MediumCode lang={"sh"}>{`
$ npm version patch
v1.0.1
        `}</MediumCode>
        <SmallText>Notice that <code>package.json</code> updated automatically.</SmallText>
    </Slide>,
    <Slide>
        <SmallText>You can also use "<code>npm version minor</code>" and "<code>npm version major</code>".</SmallText>
        <MediumText>If you don't know what these mean, see semver.org.</MediumText>
    </Slide>,
        <Slide>
        <MediumText>Go ahead and publish the update:</MediumText>
        <MediumCode lang={"sh"}>{`
$ npm publish
...
npm notice Publishing to https://registry.npmjs.org/ with tag latest and default access
+ @pagekey/blaze@1.0.1
        `}</MediumCode>
    </Slide>,
        <Slide>
            <BigText>5. Try it out</BigText>
        </Slide>,
        <Slide>
        <MediumText>Turn off the local install:</MediumText>
        <MediumCode lang={"sh"}>{`
$ npm unlink -g @pagekey/blaze

removed 1 package in 431ms
        `}</MediumCode>
    </Slide>,
        <Slide>
        <MediumText>Try to run the public one:</MediumText>
        <MediumCode lang={"sh"}>{`
$ npx @pagekey/blaze
Need to install the following packages:
@pagekey/blaze@1.0.1
Ok to proceed? (y) y

Usage: blaze [options] [command]

Options:
  -h, --help          display help for command

Commands:
  new [project-name]  Create a new project
  help [command]      display help for command
        `}</MediumCode>
        <SmallText>It works!</SmallText>
    </Slide>,
        <Slide>
            <MediumText>There we go - our package is published!</MediumText>
        </Slide>,
        <Slide>
            <BigText>That's it!</BigText>
            <MediumText>1. Created a local Node package.</MediumText>
            <MediumText>2. Added a simple CLI.</MediumText>
            <MediumText>3. Published to npmjs.com.</MediumText>
            <MediumText>4. Ran it using <code>npx</code>!</MediumText>
        </Slide>,
        <Slide>
            <MediumText>Later: React SSR, SSG, Slides</MediumText>
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
                <div id="slide_error">
                    Error: Slide {slide} out of bounds.
                </div>
            </Slide>
        );
    }
}
