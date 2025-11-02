import fs from "node:fs";
import { unlink } from "node:fs/promises";
import path from "node:path";

export async function rmHandler(args) {
  const filePath = path.resolve(args.trim());
  if (!fs.existsSync(filePath)) {
    console.log("Invalid input");
  } else {
    const stat = fs.lstatSync(filePath);
    if (!stat.isFile()) {
      console.log("Invalid input");
    } else {
      await unlink(filePath);
    }
  }
}


