const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const filterGutenbergClasses = require("./gutenbergClassFilter");
const app = express();
app.use(bodyParser.json());
const publicDir = path.join(__dirname, "public");
if (!fs.existsSync(publicDir)) {
	fs.mkdirSync(publicDir);
}
app.post("/compile", (req, res) => {
	const content = req.body.classes;
	if (!content) {
		return res.status(400).send("Bad Request 💅🏽");
	}
	const tailwindClasses = filterGutenbergClasses(content);
	console.log("Received classes:", content);
	console.log("Extracted Tailwind classes:", tailwindClasses);
	const tempFile = "./public/temp.html";
	const htmlContent = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Temp</title></head><body><div class="${tailwindClasses}"></div></body></html>`;
	const tailwindConfig = "./tailwind.config.js";
	fs.writeFileSync(tempFile, htmlContent);
	exec(`npx tailwindcss -c ${tailwindConfig} -o public/tailwind.css --content ${tempFile}`, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return res.status(500).send("Internal Server Error");
		}
		fs.readFile("public/tailwind.css", "utf8", (readError, data) => {
			if (readError) {
				console.error(`readFile error: ${readError}`);
				return res.status(500).send("Internal Server Error");
			}
			const css = `/* 💎 Developed By na-Qasim 💎 */\n${data}`;
			res.send(css);
		});
	});
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.clear();
	console.log(`🫶🏼 Server running on port ${PORT} `);
});
app.get("/abrarqasim", (req, res) => {
	res.json({ message: "Yallah!" });
});
