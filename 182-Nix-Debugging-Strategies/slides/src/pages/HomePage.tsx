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
            <BigText>My least favorite thing</BigText>
            <MediumText>is debugging code</MediumText>
            <SmallText>in chunks that are too big.</SmallText>
        </Slide>,
        <Slide>
            <MediumText>It's painful because</MediumText>
            <MediumText>you don't have a good feedback loop.</MediumText>
            <SmallText>When you make a small change,</SmallText>
            <SmallText>you're left guessing at whether it worked.</SmallText>
        </Slide>,
        <Slide>
            <BigText>The fix:</BigText>
            <MediumText>Use debugging tools</MediumText>
            <SmallText>to zoom in</SmallText>
            <SmallText>and break it into smaller pieces.</SmallText>
        </Slide>,
        <Slide>
            <BigText>Nix Debugging Strategies</BigText>
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
            <SmallText className="text-red-200">Imagine: Apple decides everyone should have red texts.</SmallText>
            <SmallText className="text-green-200">No more green.</SmallText>
            <SmallText className="text-blue-200">No more blue.</SmallText>
            <SmallText className="text-red-400">Just red.</SmallText>
            <SmallText>You disagree. It's ugly.</SmallText>
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
            <SmallText>these slides are made with pure react.</SmallText>
            <SmallText>NO FRAMEWORK!</SmallText>
        </Slide>,
        <Slide>
            <div>
                <SmallText>Here's the build script. (&lt;50 lines)</SmallText>
                    <CodeBlock lang="js">
                    {`
import * as esbuild from 'esbuild';
import * as chokidar from 'chokidar';
import postcss from 'esbuild-postcss';
import * as fs from 'fs';
const build = async (sourcemap) => {
    console.log("Building...")
    const start = Date.now();
    try {
        await esbuild.build({
            entryPoints: ["src/index.tsx"],
            bundle: true,
            outfile: 'dist/bundle.js',
            sourcemap,
            plugins: [postcss()],
        });
        fs.copyFileSync('public/logo.png', 'dist/logo.png');
        fs.copyFileSync('public/index.html', 'dist/index.html');
    } catch(e) {
        console.error(e);
    }
    const end = Date.now();
    console.log(\`Done in \${end-start} ms.\`);
};
if (process.argv.includes("--watch")) {
    await build(true);
    const watcher = chokidar.watch(["src","public"], { persistent: true });
    watcher.on('change', async (path) => {
        console.log(\`Changed: \${path}\`);
        await build(true);
    });
    console.log('Watching for changes...');
    setInterval(() => { }, 1000);
} else {
    await build(false);
}`}
                </CodeBlock>
            </div>
        </Slide>,
        <Slide>
            <div>
                <SmallText>
                    Here are the dependencies:
                </SmallText>
            <CodeBlock lang="js">
{`{
    "dependencies": {
        "@tailwindcss/postcss": "^4.0.1",
        "esbuild": "^0.24.2",
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "react-syntax-highlighter": "^15.6.1",
        "tailwindcss": "^4.0.1"
    },
    "scripts": {
        "build": "node scripts/build.mjs",
        "dev": "npm run build -- --sourcemap --watch"
    },
    "devDependencies": {
        "chokidar": "^4.0.3",
        "daisyui": "^5.0.0-beta.5",
        "esbuild-postcss": "^0.0.4",
        "postcss": "^8.5.1",
        "postcss-simple-vars": "^7.0.1"
    }
}`}
            </CodeBlock>
            </div>
        </Slide>,
        <Slide>
            <SmallText>
                My next video will share more details.
                <div className="text-lg">(subscribe!)</div>
            </SmallText>
            <MediumText>In the meantime, the source is on GitHub:</MediumText>
            <SmallText className="text-blue-400">github.com/pagekey/education</SmallText>
            <SmallText className="text-yellow-200">Folder: 182-Nix-Debugging-Strategies</SmallText>
        </Slide>,
        <Slide>
            <BigText>Overview</BigText>
            <MediumText>1. <code>nix repl</code></MediumText>
            <MediumText>2. Using <code>default.nix</code></MediumText>
            <MediumText>3. Clearing Cache with Surgical Precision</MediumText>
        </Slide>,
        <Slide>
            <BigText>1. <code>nix repl</code></BigText>
        </Slide>,
        <Slide>
            <MediumText>If you're not sure what something does in Nix,</MediumText>
            <MediumText>try plugging it in, one line at a time</MediumText>
            <MediumText>into <code>nix-repl</code>.</MediumText>
        </Slide>,
        <Slide>
            <CodeBlock lang="sh">$ nix repl</CodeBlock>
            <CodeBlock lang="sh">

                {`
Welcome to Nix 2.18.8. Type :? for help.

nix-repl> 
                `}
            </CodeBlock>
        </Slide>,
        <Slide>
            <CodeBlock lang="nix" className="z-2">
                {`
nix-repl> pkgs = import <nixpkgs>{}

nix-repl> 
                  `}
            </CodeBlock>
            <CodeBlock lang="nix" className="z-1">
                {`
nix-repl> pkgs = import <nixpkgs>{}

nix-repl> defaultNix = builtins.fetchurl {
  url = "https://raw.githubusercontent.com/pagekey/education/refs/heads/main/176-Nix-Package-C/sample-app-c/default.nix";
  sha256 = "sha256:05357l33rllpyw2479rb0i06mi18aqm3dn20hrywmi3zi0a6q6a1";
}

nix-repl> 
                  `}
            </CodeBlock>
        </Slide>,
        <Slide>
            <CodeBlock lang="nix">
                {`
nix-repl> defaultNix
"/nix/store/82hmlcx913wg7yr9wrs7wx9ibhmvbl2p-default.nix"

nix-repl> pkgs.callPackage defaultNix
«lambda @ /nix/var/nix/profiles/per-user/root/channels/nixos/lib/customisation.nix:212:35»

nix-repl> pkgs.callPackage defaultNix { }
«derivation /nix/store/51v9ynzz2mm6c0s55i61p4x2xlvy6d23-sample-app-c-1.0.0.drv»
                  `}
            </CodeBlock>
            <CodeBlock lang="bash">
                {`
$ cat /nix/store/82hmlcx913wg7yr9wrs7wx9ibhmvbl2p-default.nix

{ pkgs ? import <nixpkgs> { }, src ? ./src, subdir ? "" }:
let theSource = src; in
pkgs.stdenv.mkDerivation rec {
    pname = "sample-app-c";
...
                `}
            </CodeBlock>
        </Slide>,
        <Slide>
            <div>
                <MediumText>Now how do we "call" that derivation?</MediumText>
                <CodeBlock lang="nix">
                    {`
nix-repl> pkgs.callPackage defaultNix { }
«derivation /nix/store/51v9ynzz2mm6c0s55i61p4x2xlvy6d23-sample-app-c-1.0.0.drv»
                    `}
                </CodeBlock>
            </div>
            <MediumText>Can't do it in the REPL,</MediumText>
            <MediumText>So we need to...</MediumText>
        </Slide>,
        <Slide>
            <BigText>2. Use <code>default.nix</code></BigText>
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
theBuiltPackage
                `}
            </CodeBlock>
        </Slide>,
        <Slide>
            <CodeBlock lang="sh">$ nix-build</CodeBlock>
            <CodeBlock lang="sh">{`
this derivation will be built:
  /nix/store/51v9ynzz2mm6c0s55i61p4x2xlvy6d23-sample-app-c-1.0.0.drv
building '/nix/store/51v9ynzz2mm6c0s55i61p4x2xlvy6d23-sample-app-c-1.0.0.drv'...
Running phase: unpackPhase
unpacking source archive /nix/store/7p4w63w5qkd92wjgqy26ym3dvpl22m2w-src-1.33
source root is src-1.33
Running phase: patchPhase
Running phase: updateAutotoolsGnuConfigScriptsPhase
Running phase: configurePhase
no configure script, doing nothing
Running phase: buildPhase
cc1: fatal error: /nix/store/7p4w63w5qkd92wjgqy26ym3dvpl22
            `}</CodeBlock>
        </Slide>,
        <Slide>
            <BigText>3. Clearing Cache with Surgical Precision</BigText>
        </Slide>,
        <Slide>
            <SmallText>Sometimes, a remote file changes</SmallText>
            <SmallText>but Nix has it cached, so you can't see those changes.</SmallText>
            <MediumText>How do we force Nix to grab the latest version of the file?</MediumText>
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
$ nix-store --delete /nix/store/4sn1xmgw01xz3w0ln0f3qwacm6yilidf-default.nix
`}
            </CodeBlock>
            <CodeBlock lang="sh">{`
finding garbage collector roots...
removing stale link from '/nix/var/nix/gcroots/auto/i403gpm6mxna09iwrbpjxl0h58mgf15y' to '/tmp/nixos-rebuild.Ma3h2d/nix.drv'
removing stale link from '/nix/var/nix/gcroots/auto/4rm1caqnqyfqvrd1jc6ka3fqyhdq1ami' to '/tmp/nixos-rebuild.iJ1OnB/nix'
deleting '/nix/store/4sn1xmgw01xz3w0ln0f3qwacm6yilidf-default.nix'
deleting unused links...
note: currently hard linking saves -0.00 MiB
1 store paths deleted, 0.00 MiB freed
            `}</CodeBlock>
            <Arrow x={225} y={200} />
            <Arrow x={225} y={280} />
        </Slide>,
        <Slide>
            <BigText>That's it!</BigText>
            <MediumText>1. Learned how to use <code>nix repl</code></MediumText>
            <MediumText>2. Can eval derivations with <code>default.nix</code></MediumText>
            <MediumText>3. Figured out how to clear cache</MediumText>
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
