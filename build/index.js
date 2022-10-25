"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.all("/", (req, res) => {
    return res.send("OK Request from " + req.ip);
});
const passkitFile = fs_1.default.readFileSync(__dirname + "/../SamplePasses/BoardingPass.pkpass");
app.get("/pass", (req, res) => {
    res.contentType("application/vnd.apple.pkpasses");
    return res.end(passkitFile);
});
app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});
