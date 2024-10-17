var os = require("os");
var path = require("path");

let platform = os.platform();
if (platform == "win32") {
  platform = "win";
}
console.log(platform);
if (platform !== "linux" && platform !== "win" && platform !== "darwin") {
  console.error("Unsupported platform.", platform);
  process.exit(1);
}

var arch = os.arch();
if (platform == "win" && arch === "arm64") {
  arch = "x64";
}

var basisuPath = path.join(
  __dirname,
  "bin",
  platform,
  arch,
  platform === "win" ? "basisu.exe" : "basisu",
);

exports.path = basisuPath;
