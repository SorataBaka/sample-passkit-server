import express, { Request, Response } from "express";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.all("/", (req: Request, res: Response) => {
	return res.send("OK Request from " + req.ip);
});

const passkitFile = fs.readFileSync(
	__dirname + "/../SamplePasses/BoardingPass.pkpass"
);

app.get("/pass", (req: Request, res: Response) => {
	res.contentType("application/vnd.apple.pkpasses");
	return res.end(passkitFile);
});

app.listen(PORT, () => {
	console.log("Server listening on port " + PORT);
});
