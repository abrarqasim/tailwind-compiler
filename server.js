const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.post('/compile', (req, res) => {
    const classes = req.body.classes;
    const tempFile = path.join(__dirname, 'public/temp.html');
    fs.writeFileSync(tempFile, `<div class="${classes}"></div>`);

    exec('npx tailwindcss -i public/temp.html -o public/tailwind.css --minify', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Error compiling CSS');
        }
        const css = fs.readFileSync('public/tailwind.css', 'utf8');
        res.send(css);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
