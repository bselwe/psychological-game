const path = require("path");

const root = path.resolve(__dirname, "..");
const ts = path.join(root, "ts");
const tsConfig = path.join(root, "tsconfig.json");
const tsLint = path.join(root, "tslint.json");

module.exports = {
    root,
    ts,
    tsConfig,
    tsLint,
    images: path.join(root, "images"),
    config: env => path.join(ts, "Configuration", `Config.${env}.ts`)
}
