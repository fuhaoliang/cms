// 生成对应环境的配置文件
let path = require("path");
let fs = require("fs");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

function copyFile(sourceFile, destFile) {
  fs.writeFileSync(destFile, fs.readFileSync(sourceFile));
}

let configFile = resolve("config/app.pro.js");
if (process.env.NODE_ENV === "development") {
  configFile = resolve("config/app.dev.js");
} else if (process.env.NODE_ENV === "alpha") {
  configFile = resolve("config/app.alp.js");
} else if (process.env.NODE_ENV === "uat") {
  configFile = resolve("config/app.uat.js");
}

let sourceFile = configFile;
let destFile = resolve("config/app.js");

copyFile(sourceFile, destFile);
