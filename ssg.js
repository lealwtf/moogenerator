const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const ejs = require('ejs');

function ssg(yamlPath) {
  const templatePath = path.join(__dirname, 'templates', 'template.ejs');
const outputDir = path.resolve(process.cwd(), 'public');

  const fileName = path.basename(yamlPath, path.extname(yamlPath));

  const outputHTMLPath = path.join(outputDir, `${fileName}.html`);

  const yamlContent = fs.readFileSync(yamlPath, 'utf8');
  const template = fs.readFileSync(templatePath, 'utf8');
  const data = YAML.parse(yamlContent);

  const safeData = {
    title: data.title || "Sem título",
    theme: data.theme || "light",
    header: data.header || [],
    blocks: data.blocks || []
  };

  const html = ejs.render(template, safeData);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  fs.writeFileSync(outputHTMLPath, html);
}
module.exports = ssg;
