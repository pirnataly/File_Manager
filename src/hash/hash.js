import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";

export async function hashHandler(args) {
  const filePath = path.resolve(args.trim());
  if (!fs.existsSync(filePath)) {
    throw new Error();
  }
  const stat = fs.lstatSync(filePath);
  if (!stat.isFile()) {
    throw new Error();
  }

  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const readable = fs.createReadStream(filePath);

    readable.on("error", (err) => reject(err));

    readable.on("data", (chunk) => hash.update(chunk));

    readable.on("end", () => {
      const digest = hash.digest("hex");
      console.log(`SHA-256 hash для файла ${filePath}: ${digest}`);
      resolve(digest);
    });
  });
}
