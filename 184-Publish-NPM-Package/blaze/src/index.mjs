#!/usr/bin/env node

import { program } from "commander";

program
  .command("new [project-name]")
  .description("Create a new project")
  .action((projectName = "my-project") => {
    console.log("Hello world from Blaze.");
  });

program.parse(process.argv);
