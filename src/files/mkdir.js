import path from "node:path";
import { mkdir }  from 'node:fs/promises';
import process from "node:process";

export async function mkdirHandler(dir){
  const projectFolder = path.join(process.cwd(), dir);
   await mkdir(projectFolder, { recursive: false });
}
