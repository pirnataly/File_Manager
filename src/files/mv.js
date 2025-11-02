import fs from "node:fs";
import path from "node:path";
import {unlink} from "node:fs/promises";
import { parseFileAndDest } from "../utils/utils.js";

export async function mvHandler(args) {
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

    writable.on("finish", async () => {
      try {
        await unlink(src);
        console.log("Successfully moved file " + destPath);
        resolve(destPath);
      } catch (err) {
        reject(err);
      }
    });
  });
}
