import fs from "node:fs";
import path from "node:path";
import { createBrotliDecompress } from "node:zlib";
import { parseFileAndDest } from "../utils/utils.js";

export async function decompressHandler(args) {
const {src, destDir}=parseFileAndDest(args);

  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  const fileName = path.basename(src).replace(/\.br$/, "");
  const destPath = path.join(destDir, fileName);

  return new Promise((resolve, reject) => {
    const readable = fs.createReadStream(src);
    const writable = fs.createWriteStream(destPath);
    const brotli = createBrotliDecompress();

    readable.pipe(brotli).pipe(writable);

    writable.on("finish", () => resolve(destPath));
    readable.on("error", reject);
    writable.on("error", reject);
    brotli.on("error", reject);
  });
}
