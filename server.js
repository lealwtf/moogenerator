const express = require('express');
const path = require('path');
const fs = require('fs');
const ssg = require('./ssg');

function serve(yamlPath) {
    const outputDir = path.join(__dirname, 'public');

    let nomeArquivo = yamlPath.split('\\');
    nomeArquivo = nomeArquivo[nomeArquivo.length - 1];
    const outputHTMLPath = path.join(outputDir, `${nomeArquivo}.html`);

    if (!fs.existsSync(outputHTMLPath)) {
        console.log(`HTML file not found, creating ${outputHTMLPath}...`);
        ssg(yamlPath);
    }

    const app = express();
    const port = 3000;

    app.use(express.static(outputDir));

    // app.get('/', (req, res) => {
    //     res.sendFile(outputHTMLPath);
    // });

    ssg(yamlPath)
    app.listen(port, () => {
        console.log(`Server running in: http://localhost:${port}/`);
    });
}

module.exports = serve;