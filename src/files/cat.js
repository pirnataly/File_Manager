import { open} from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { consoleCurrentDir } from "../utils/utils.js";

export async function catHandler(filePath,output) {
  try {
    const fullPath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(process.cwd(), filePath);

    const fileHandle = await open(fullPath, 'r');

    const readable = fileHandle.readableWebStream();

    const textStream = readable.pipeThrough(new TextDecoderStream());

    for await (const chunk of textStream) {
      output.write(chunk);
    }

    console.log('\n');

    await fileHandle.close();
  } catch {
    console.log('Operation failed');
  }
 finally {
    consoleCurrentDir();
  }
}
