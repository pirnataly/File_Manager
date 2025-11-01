import process from "node:process";
import { navigateUp } from './navigate.js';
import { cwd } from "node:process";

export function upHandler(output){
  try{
    let directory = process.cwd();
    navigateUp(directory);
  }
  catch {
    console.log('Operation failed');
 }
 finally {
    console.log(`You are currently in ${cwd()}`)
  }
}