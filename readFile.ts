import { rejects } from "node:assert";
import fs from "node:fs/promises";
import ReadLine from "readline/promises";

export const readFileTillNLines = async (
  filename: string,
  n: number
): Promise<void> => {
  return new Promise<void>(async (resolve, reject) => {
    const fileHandler = await fs.open(filename, "r");
    const fileReadStream = fileHandler.createReadStream();
    let fileContentBuffer = Buffer.alloc(0);
    let logged = false;

    fileReadStream.on("data", (chunk: Buffer) => {
      fileContentBuffer = Buffer.concat([fileContentBuffer, chunk]);
      const fileContent: string = fileContentBuffer.toString("utf-8");
      const newLines = fileContent.match(/\n/g)?.length;
      if (newLines && newLines >= n) {
        //if we encounter that many lines or more
        logged = true;
        //we need all the content till the nth index of \n
        let content = "",
          lines = 0,
          pos = 0;
        for (let i = 0; i < fileContent.length; i++) {
          const c: string = fileContent.charAt(i);
          if (c === "\n") {
            lines++;
            if (lines === n) {
              pos = i;
              break;
            }
          }
        }
        console.log(fileContent.substring(0, pos + 1));
      }
    });

    fileReadStream.on("end", async () => {
      if (!logged) {
        console.log(fileContentBuffer.toString("utf-8"));
      }
      await fileHandler.close();
      resolve();
    });

    fileReadStream.on("error", (err: Error) => {
      console.error(err.message);
      reject();
    });
    
  });
};

export const readFileTillCBytes = async (
  fileName: string,
  c: number
): Promise<void> => {
  //TODO
};

export const handleCCHead = () => {
  let i = 0;
  const readLine = ReadLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readLine.on("line", (input) => {
    i++;
    console.log(input);
    if (i == 10) {
      readLine.close();
    }
  });
};
