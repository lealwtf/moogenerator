const express = require('express');
const path = require('path');
const fs = require('fs');
const ssg = require('./ssg');

function serve(yamlPath) {
  const outputDir = path.join(process.cwd(), 'public');

  const fileName = path.basename(yamlPath, path.extname(yamlPath));
  const outputHTMLPath = path.join(outputDir, `${fileName}.html`);

  if (!fs.existsSync(outputHTMLPath)) {
    console.log(`HTML file not found. Creating ${outputHTMLPath}...`);
    try {
      ssg(yamlPath);
      // Verificar se o arquivo foi realmente criado
      if (!fs.existsSync(outputHTMLPath)) {
        console.error('Failed to create HTML file');
        process.exit(1);
      }
    } catch (error) {
      console.error('Error generating HTML:', error.message);
      process.exit(1);
    }
  }

  const app = express();
  const port = 3000;

  app.use(express.static(outputDir));

  // Validação de segurança para evitar path traversal
  const safePath = path.resolve(outputHTMLPath);
  if (!safePath.startsWith(path.resolve(outputDir))) {
    console.error('Invalid file path detected');
    process.exit(1);
  }
  
  app.get('/', (req, res) => {
    res.sendFile(safePath);
  });


  app.listen(port, () => {
   console.log(`
  (__)  
  (oo)  
 /------\\/ 
/ |    ||   
*  /\\---/\\
   ~~   ~~
Moo! Serving at http://localhost:${port}
`);
  });
}

module.exports = serve;
