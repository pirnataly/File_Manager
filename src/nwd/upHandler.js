import process from "node:process";
import { navigateUp } from './navigate.js';


export function upHandler(){
    let directory = process.cwd();
    navigateUp(directory);
}