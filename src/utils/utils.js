import { homedir } from "node:os";
import { parseArgs } from "node:util";
import { cwd } from "node:process";
import fs from "node:fs/promises";
import * as path from "node:path";
import { navigate } from "../nwd/navigate.js";

export function getUsername() {
  const { values } = parseArgs({
      options: {
        username: { type: "string", default: "Anonymous user" }
      },
      strict: false
    }
  );
  return values.username;
}

export function getHomeDir() {
  return homedir();
}

export function consoleCurrentDir() {
  console.log(`You are currently in ${cwd()}`);
}

export async function goTo(newPath) {
    const newPathToGo = path.isAbsolute(newPath)
      ? newPath
      : path.join(cwd(), newPath);

    const stat = await fs.stat(newPathToGo);
    if (!stat.isDirectory()) {
      throw new Error();
    } else {
      navigate(newPathToGo);
    }
}