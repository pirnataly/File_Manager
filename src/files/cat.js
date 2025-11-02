import { open } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

export async function catHandler(pathToRead) {
  const fullPath = path.isAbsolute(pathToRead)
    ? pathToRead
    : path.resolve(process.cwd(), pathToRead);

  const fileHandle = await open(fullPath, "r");
  const readable = fileHandle.readableWebStream();
  const textStream = readable.pipeThrough(new TextDecoderStream());
  for await (const chunk of textStream) {
    console.log(chunk);
  }
  console.log("\n");

  await fileHandle.close();
}
