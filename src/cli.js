import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { upHandler } from "./nwd/upHandler.js";
import { cdHandler } from "./nwd/cdHandler.js";
import { lsHandler } from "./nwd/lsHandler.js";
import { catHandler } from "./files/cat.js";
import { addHandler } from "./files/add.js";
import { handle } from "./utils/utils.js";
import { mkdirHandler } from "./files/mkdir.js";
import { rnHandler } from "./files/rn.js";
import { cpHandler } from "./files/cp.js";
import { mvHandler } from "./files/mv.js";
import { rmHandler } from "./files/rm.js";
import { osHandler } from "./os/osHandler.js";
import { hashHandler } from "./hash/hash.js";


const readline = createInterface({ input, output });

export async function cli() {

  readline.on("line", (input) => {
    const [command, ...args] = input.trim().split(" ");
    switch (command) {
      case "up": {
        handle(null, upHandler);
        break;
      }
      case "cd": {
        handle(args, cdHandler);
        break;
      }
      case "ls": {
        handle(null, lsHandler);
        break;
      }
      case "cat": {
        handle(args, catHandler);
        break;
      }
      case "add": {
        handle(args, addHandler);
        break;
      }
      case "mkdir": {
        handle(args, mkdirHandler);
        break;
      }
      case "rn": {
        handle(args, rnHandler);
        break;
      }
      case "cp": {
        handle(args, cpHandler);
        break;
      }
      case "mv": {
        handle(args, mvHandler);
        break;
      }
      case "rm": {
        handle(args, rmHandler);
        break;
      }
      case "os": {
        handle(args, osHandler);
        break;
      }
      case "hash": {
        handle(args, hashHandler);
      }

    }
  });
}
