import { cli } from "./src/cli.js";
import process from "node:process";
import { consoleCurrentDir, getHomeDir, getUsername } from "./src/utils/utils.js";
import { navigate } from "./src/nwd/navigate.js";

async function app() {
  const username = getUsername();
  const homeDir = getHomeDir();

  console.log(`Welcome to the File Manager, ${username}!`);
  navigate(homeDir);
  consoleCurrentDir();

  await cli();
  process.on("exit", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  });
}

try {
  void app();
} catch (err) {
  console.error(`This is an error`, err);
  process.exit(1);
}
