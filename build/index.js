"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
express_1.default.static.mime.define({
    "application/vnd.apple.pkpass": ["pkpass"],
});
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.all("/", (req, res) => {
    return res.send("OK Request from " + req.ip);
});
app.get("/pass/:passtype", (req, res) => {
    res.contentType("application/vnd.apple.pkpass");
    res.setHeader("Content-type", "application/vnd.apple.pkpasses");
    const passName = req.params.passtype + ".pkpass";
    if (!fs_1.default.existsSync(__dirname + `/../SamplePasses/${passName}`))
        return res.status(404).send("File not found");
    const file = fs_1.default.readFileSync(__dirname + `/../SamplePasses/${passName}`);
    return res.end(file);
});
app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});
