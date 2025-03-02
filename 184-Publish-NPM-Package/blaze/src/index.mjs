import { program } from "commander";
import fs from "fs";
import { execSync } from "child_process";

program
  .command("new [project-name]")
  .description("Create a new project")
  .action((projectName = "my-project") => {
    // Create a folder to hold all the app's files.
    const targetDir = path.join(process.cwd(), projectName);
    
    if (fs.existsSync(targetDir)) {
      console.error("Error: Directory already exists!");
      process.exit(1);
    } else {
      console.log(`Creating project ${projectName}`);
      fs.mkdirSync(targetDir, { recursive: true });
      fs.mkdirSync(path.join(targetDir, "src"), { recursive: true });
      fs.mkdirSync(path.join(targetDir, "public"), { recursive: true });
      fs.writeFileSync(
        path.join(targetDir, "package.json"),
        JSON.stringify({
          name: projectName,
          version: "1.0.0",
        }),
        null,
        2,
      );
      execSync(`cd ${targetDir} && npm install esbuild react react-dom`, { stdio: "inherit" });
      console.log("Project setup complete!");
    }
  });

program.parse(process.argv);
