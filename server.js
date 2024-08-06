const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Ensure the public directory exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}


// Endpoint to get contents of temp.txt
app.get('/get-temp', (req, res) => {
    const tempFile = path.join(publicDir, 'temp.txt');
    fs.readFile(tempFile, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading temp.txt: ${err.message}`);
            return res.status(500).send('Error reading temp.txt');
        }
        res.send(data);
    });
});

app.post('/compile', (req, res) => {
    const classes = req.body.classes;
    const tempFile = path.join(publicDir, 'temp.txt');

    // Wrap classes in a CSS selector
    const cssContent = `
        .compiled-tailwind {
            ${classes.split(' ').map(cls => `@apply ${cls};`).join('\n')}
        }
    `;

    // Write classes to a text file
    fs.writeFileSync(tempFile, cssContent);

    // Tailwind CSS JIT mode command
    const tailwindConfig = path.join(__dirname, 'tailwind.config.js');
    exec(`npx tailwindcss --input ${tempFile} --output public/tailwind.css --config ${tailwindConfig} --jit`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            console.error(`stderr: ${stderr}`);
            return res.status(500).send('Error compiling CSS');
        }
        const css = fs.readFileSync(path.join(publicDir, 'tailwind.css'), 'utf8');
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
