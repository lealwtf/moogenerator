const express = require('express');
const path = require('path');
const fs = require('fs');
const ssg = require('./ssg');

function serve(yamlPath) {
  const outputDir = path.join(__dirname, 'public');

  const fileName = path.basename(yamlPath, path.extname(yamlPath));
  const outputHTMLPath = path.join(outputDir, `${fileName}.html`);

  if (!fs.existsSync(outputHTMLPath)) {
    console.log(`HTML file not found. Creating ${outputHTMLPath}...`);
    ssg(yamlPath);
  }

  const app = express();
  const port = 3000;

  app.use(express.static(outputDir));

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/${fileName}.html`);
  });
}

module.exports = serve;
