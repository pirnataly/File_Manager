import { homedir } from "node:os";
import { parseArgs } from "node:util";
import { cwd } from "node:process";
import {existsSync,lstatSync} from "node:fs";
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

async function wrapWithArgs(args, fn) {
  const trimmedArgs = args.join(" ").trim();
  try {
    if (!trimmedArgs) {
      console.log("Invalid input");
    } else {
      await fn(trimmedArgs);
    }
  } catch {
    console.log("Operation failed");
  } finally {
    consoleCurrentDir();
  }
}

function wrapWithoutArgs(fn) {
  try {
    fn();
  } catch {
    console.log("Operation failed");
  } finally {
    consoleCurrentDir();
  }
}

export function handle(args, callback) {
  if (args) {
    void wrapWithArgs(args, callback);
  } else {
    wrapWithoutArgs(callback);
  }
}


export function parseFileAndDest(args) {
  const parts = args.trim().split(" ");
  let src = "";
  let destDir = "";

  for (let i = parts.length; i > 0; i--) {
    const possibleSrc = parts.slice(0, i).join(" ");
    if (existsSync(possibleSrc) && lstatSync(possibleSrc).isFile()) {
      src = possibleSrc;
      destDir = parts.slice(i).join(" ").trim();
      break;
    }
  }

  if (!src || !destDir) {
    throw new Error();
  }

  return { src, destDir };
}