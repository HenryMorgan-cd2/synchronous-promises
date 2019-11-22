import { execSync, execFileSync, spawnSync } from "child_process";
import * as fs from "fs";

function runSync<T>(promiseFunc: () => Promise<T>): any {
  const source = promiseFunc.toString();

  const res = spawnSync(`node`, [
    "-e",
    `
    with(require("tslib")) {
      (${source})().then(result => console.log(JSON.stringify(result)))
    }
  `
  ]);
  // execFileSync(fullPath, { stdio: "inherit" });

  console.error(res.stderr.toString());

  return JSON.parse(res.stdout.toString());
}

const promiseFunc = async () => {
  const results = await fs.promises.readdir(__dirname);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return results.slice(0, 4);
};

console.log(1);
console.log(runSync(promiseFunc));
console.log(2);
