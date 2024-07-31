import ReadLine from "node:readline";
import { exit } from "process";
import {
  handleCCHead,
  readFileTillCBytes,
  readFileTillNLines,
} from "./readFile.ts";

/*

---------------TO RUN---------------
npm start -- cchead <rest of the command>

here the -- tells npm to pass the rest of the arguments to the script
and not that for npm

------------INPUT TYPES HANDLED-------------------

head
head <filename>
head <filename1> <filename2> <filename3>
head -n5 <filename>
head -n10 <filename1> <filename2>
head -c 10 <filename>
head -c 33 <filename1> <filename2>

*/

const input = process.argv; //npm start cchead <filepath>

if (input[2] !== "cchead") {
  console.error(
    "please enter a valid command !\nfollow this format : npm start cchead <absolute file path>"
  );
  exit(1);
}

if (input.length < 4) {
  handleCCHead();
} else {
  try {
    //default values , assuming that no spec has been provided
    let limit: number = 10;
    let files: string[] = input.slice(3);

    if (
      (input[3]!.startsWith("-n") || input[3]!.startsWith("-c")) &&
      !isNaN(Number(input[3]!.substring(2)))
    ) {
      //update if lines / bytes have been passed
      limit = Number(input[3]!.substring(2));
      files = input.slice(4);
    }

    processFiles(files, limit);
  } catch (error: any) {
    console.error(error.toString());
  }
}

async function processFiles(files: string[], limit: number) {
  const printTitle = files.length > 1;

  for (let i = 0; i < files.length; i++) {
    const fileName: any = files[i];
    if (printTitle) {
      console.log(`==> ${fileName} <==`, "\n");
    }

    if (input[3]!.startsWith("-c")) {
      await readFileTillCBytes(fileName as string, limit);
    } else {
      await readFileTillNLines(fileName as string, limit);
    }

    if (printTitle) {
      console.log("\n");
    }
  }
}
