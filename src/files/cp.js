import fs from "node:fs";
import path from "node:path";

export async function cpHandler(args) {
  let readable;
  let writable;
  try {
    const parts = args.split(" ");
    let src = "";
    let destDir = "";
    for (let i = parts.length; i > 0; i--) {
      const possibleSrc = parts.slice(0, i).join(" ");
      if (fs.existsSync(possibleSrc) && fs.lstatSync(possibleSrc).isFile()) {
        src = possibleSrc;
        destDir = parts.slice(i).join(" ");
        break;
      }
    }
    if (!src || !destDir) {
      console.log("Invalid input");
    } else {
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      const fileName = path.basename(src);
      const destPath = path.join(destDir, fileName);

      readable = fs.createReadStream(src);
      writable = fs.createWriteStream(destPath);
      readable.pipe(writable);
    }

  } finally {
    if (readable) readable.destroy();
    if (writable) writable.end();
  }

}

