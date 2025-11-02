import fs from "node:fs";
import path from "node:path";
import { createBrotliCompress } from "node:zlib";
import { parseFileAndDest } from "../utils/utils.js";

export async function compressHandler(args) {
  const { src, destDir } = parseFileAndDest(args);

  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  const destPath = path.join(destDir, path.basename(src) + ".br");

  return new Promise((resolve, reject) => {
    const readable = fs.createReadStream(src);
    const writable = fs.createWriteStream(destPath);
    const brotli = createBrotliCompress();

    readable.pipe(brotli).pipe(writable);

    writable.on("finish", () => {
      resolve(destPath);
      console.log("Compressing successfully");
    });

    readable.on("error", reject);
    writable.on("error", reject);
    brotli.on("error", reject);
  });
}
