#!/usr/bin/env node
const { execFile } = require("child_process");
const args = process.argv.slice(2);

const os = require("os");
const path = require("path");
const fs = require("fs-extra");

let platform = os.platform();
if (platform == "win32") {
  platform = "win";
}
if (platform !== "linux" && platform !== "win" && platform !== "darwin") {
  console.error("Unsupported platform.", platform);
  process.exit(1);
}

let arch = os.arch();

if (platform == "win" && arch === "arm64") {
  arch = "x64";
}

const basisuPath = path.join(
  __dirname,
  platform,
  arch,
  platform === "win" ? "basisu.exe" : "basisu",
);

if (platform === "linux" || platform === "darwin") {
  fs.chmodSync(basisuPath, 0755);
}

execFile(basisuPath, args, (err, stdout, stderr) => {
  if (err) {
    console.log(`err: ${err}`);
    // node couldn't execute the command
    return;
  }

  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
