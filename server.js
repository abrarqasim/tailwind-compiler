const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// Ensure the public directory exists
const publicDir = path.join(__dirname, "public");
if (!fs.existsSync(publicDir)) {
	fs.mkdirSync(publicDir);
}

app.post("/compile", (req, res) => {
	const classes = req.body.classes;
	const tempFile = path.join(publicDir, "temp.html");
	fs.writeFileSync(tempFile, `<div class="${classes}"></div>`);

	exec("npx tailwindcss -i public/temp.html -o public/tailwind.css --minify", (error, stdout, stderr) => {
		if (error) {
			console.error(`Error: ${error.message}`);
			return res.status(500).send("Error compiling CSS");
		}
		const css = fs.readFileSync(path.join(publicDir, "tailwind.css"), "utf8");
		res.send(css);
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
app.get("/abrarqasim", (req, res) => {
	res.json({ message: "Magical stuff comming soon!" });
});
