import * as esbuild from 'esbuild';
import * as chokidar from 'chokidar';
import postcss from 'esbuild-postcss';
import * as fs from 'fs';
import * as path from 'path';


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
        fs.readdirSync("public").forEach(file => {
            if (file.endsWith('.png')) {
                fs.copyFileSync(path.join("public", file), path.join("dist", file));
            }
        });
        fs.copyFileSync('public/index.html', 'dist/index.html');
    } catch(e) {
        console.error(e);
    }
    const end = Date.now();
    console.log(`Done in ${end-start} ms.`);
};


if (process.argv.includes("--watch")) {
    await build(true);
    const watcher = chokidar.watch(["src","public"], { persistent: true });

    watcher.on('change', async (path) => {
        console.log(`Changed: ${path}`);
        await build(true);
    });

    console.log('Watching for changes...');
    setInterval(() => { }, 1000);
} else {
    await build(false);
}
