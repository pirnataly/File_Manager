import { consoleCurrentDir, goTo } from "../utils/utils.js";


export async function cdHandler(args,output){
  try{
    const pathToGo = args.join(" ").trim();
    if (!pathToGo) {
      console.log("Invalid input");
    } else {
    await goTo(pathToGo);
    }
  }
  catch(e) {
    console.log('Operation failed')
  }
  finally{
    consoleCurrentDir();
  }

}