import path from "node:path";
import fs from "node:fs/promises";
import { existsSync } from 'node:fs';

export async function rnHandler(args) {
  const lastSpaceIndex = args.lastIndexOf(" ");
  if (lastSpaceIndex === -1 || existsSync(args)) {
    console.log("Invalid input");
  }  else {
    const currentFilePath = args.substring(0, lastSpaceIndex);
    const newName = args.substring(lastSpaceIndex + 1);
    const newFilePath = path.join(path.dirname(currentFilePath), newName);
    await fs.rename(currentFilePath, newFilePath);
  }

}

