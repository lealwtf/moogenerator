const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const ejs = require('ejs');

function ssg(yamlPath){
const templatePath = path.join(__dirname,'templates', 'template.ejs');
const outputDir = path.join(__dirname, 'public');
let nomeArquivo = yamlPath.split('\\');
nomeArquivo = nomeArquivo[nomeArquivo.length - 1]
const outputHTMLPath = path.join(outputDir, `${nomeArquivo}.html`);

const yamlContent = fs.readFileSync(`${yamlPath}.yaml`, 'utf8');
const template = fs.readFileSync(templatePath, 'utf8');
const data = YAML.parse(yamlContent);
const html = ejs.render(template, data);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.writeFileSync(outputHTMLPath, html);
}
module.exports = ssg;