import express, { Request, Response } from "express";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
express.static.mime.define({
	"application/vnd.apple.pkpass": ["pkpass"],
});
express.static.mime.define({
	"application/vnd-com.apple.pkpass": ["pkpass"],
});
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.all("/", (req: Request, res: Response) => {
	return res.sendFile(__dirname + "/../index.html");
});

app.get("/pass/:passtype", (req: Request, res: Response) => {
	res.contentType("application/vnd.apple.pkpass");
	res.setHeader("Content-type", "application/vnd.apple.pkpass");
	const passName = req.params.passtype + ".pkpass";
	if (!fs.existsSync(__dirname + `/../SamplePasses/${passName}`))
		return res.status(404).send("File not found");

	const file = fs.readFileSync(__dirname + `/../SamplePasses/${passName}`);
	return res.end(file);
});
app.get("/passfix/:passtype", (req: Request, res: Response) => {
	res.contentType("application/vnd-com.apple.pkpass");
	res.setHeader("Content-type", "application/vnd-com.apple.pkpass");
	const passName = req.params.passtype + ".pkpass";
	if (!fs.existsSync(__dirname + `/../SamplePasses/${passName}`))
		return res.status(404).send("File not found");

	const file = fs.readFileSync(__dirname + `/../SamplePasses/${passName}`);
	return res.end(file);
});
app.listen(PORT, () => {
	console.log("Server listening on port " + PORT);
});
