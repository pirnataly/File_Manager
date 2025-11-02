import path from "node:path";
import {chdir} from 'node:process';

 function getUpParent(dir) {
  return path.resolve(dir,"..");
}

export function navigateUp (directory) {
  navigate(getUpParent(directory));
}

export function navigate (directory) {
  chdir(directory);
}