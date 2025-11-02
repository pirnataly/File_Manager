import { open } from "node:fs/promises";
import process from "node:process";
import path from "node:path";

export async function addHandler(fileName) {
      const fullPath = path.resolve(process.cwd(), fileName);
      const fileHandler = await open(fullPath, "w");
      console.log('Empty file is successfully created!');
      fileHandler.close();
}