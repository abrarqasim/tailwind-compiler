/**
 * @fileoverview Endpoint for compiling Tailwind CSS based on Gutenberg block classes.
 *
 * @description
 * This file defines an Express.js endpoint that accepts a POST request with
 * Gutenberg block classes, extracts the relevant Tailwind CSS classes,
 * generates a temporary HTML file, runs Tailwind CSS compilation, and
 * returns the compiled CSS with a developer comment prefixed.
 *
 * @version 1.0.0
 * @date 2024-08-07
 * @author Qasim
 */

const express = require("express");
// const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const filterGutenbergClasses = require("./gutenbergClassFilter");
const app = express();

// const apiLimiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 minute
// 	max: 10,
// 	message: "Ay yo!😰 Too many requests from this IP, please try again after a minute 😐",
// 	keyGenerator: (req, res) => {
// 		return req.ip;
// 	},
// });
// app.use(apiLimiter); 
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");
const TAILWIND_CONFIG = "./tailwind.config.js";
const TEMP_FILE = path.join(PUBLIC_DIR, "temp.html");

if (!fs.existsSync(PUBLIC_DIR)) {
	fs.mkdirSync(PUBLIC_DIR);
}

app.post("/compile", (req, res) => {
	const content = req.body.classes;
	if (!content) {
		return res.status(400).send("Bad Request 💅🏽");
	}
	console.log("Cleaning up classes...");
	const tailwindClasses = filterGutenbergClasses(content);
	// console.log("Received classes:", content);
	// console.log("Extracted Tailwind classes:", tailwindClasses);
	console.log("Adding classes in HTML markup...");
	const htmlContent = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Temp</title></head><body><div class="${tailwindClasses}"></div></body></html>`;
	fs.writeFileSync(TEMP_FILE, htmlContent);
	console.log("Compiling Tailwind CSS...🚀");
	exec(`npx tailwindcss -c ${TAILWIND_CONFIG} -o public/tailwind.css --content ${TEMP_FILE}`, (error, stdout, stderr) => {
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
			console.log("Compiled code sent! 🎉");
		});
	});
});
app.listen(PORT, () => {
	console.clear();
	console.log(`🫶🏼 Server running on port ${PORT} 🫶🏼`);
});
app.get("/abrarqasim", (req, res) => {
	res.json({ message: "Yallah!" });
});
