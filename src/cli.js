import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { upHandler } from "./nwd/upHandler.js";
import { cdHandler } from "./nwd/cdHandler.js";
import { lsHandler } from "./nwd/lsHandler.js";
import { catHandler } from "./files/cat.js";

const readline = createInterface({ input, output });

export async function cli() {

  readline.on("line", (input) => {
      const [command, ...args] = input.trim().split(" ");
      switch (command) {
        case "up": {
          upHandler(output);
          break;
        }
        case "cd": {
          cdHandler(args)
          break;
        }
        case "ls":{
          lsHandler();
          break;
        }
        case "cat":{
          catHandler(args.join(' ').trim(), output);
          break;
        }
        }
      })
    }
