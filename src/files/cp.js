import fs from "node:fs";
import path from "node:path";
import { parseFileAndDest } from "../utils/utils.js";


export async function cpHandler(args) {
  const { src, destDir } = parseFileAndDest(args);

  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  const fileName = path.basename(src);
  const destPath = path.join(destDir, fileName);

  return new Promise((resolve, reject) => {
    const readable = fs.createReadStream(src);
    const writable = fs.createWriteStream(destPath);

    readable.pipe(writable);

    readable.on("error", reject);
    writable.on("error", reject);

    writable.on("finish", () => {
      console.log("Sucessfully cp");
       resolve(destPath);
    });
  });
}

