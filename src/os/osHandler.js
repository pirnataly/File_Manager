import os from "node:os";

export function osHandler(args) {
  const command = args.trim();

  switch (command) {
    case "--EOL": {
       const eol = JSON.stringify(os.EOL);
      console.log(`End-Of-Line (EOL): ${eol}`);
      break;
    }

    case "--cpus": {
      const cpus = os.cpus();
      console.log(`Amount of CPU: ${cpus.length}`);
      console.log("Details about every CPU:");
      cpus.forEach((cpu, index) => {
        const ghz = (cpu.speed / 1000).toFixed(2);
        console.log(`CPU ${index + 1}: ${cpu.model}, ${ghz} GHz`);
      });
      break;
    }

    case "--homedir": {
      console.log(`Home directory: ${os.homedir()}`);
      break;
    }

    case "--username": {
      console.log(`Current user: ${os.userInfo().username}`);
      break;
    }

    case "--architecture": {
      console.log(`Architecture of Node.js: ${os.arch()}`);
      break;
    }

    default:
      throw new Error();
  }
}
