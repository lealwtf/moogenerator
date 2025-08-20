const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const ejs = require('ejs');

function ssg(yamlPath) {
  const configPath = path.join(process.cwd(), 'config.yaml');
  let globalConfig = {};
  if (fs.existsSync(configPath)) {
    try {
      const configContent = fs.readFileSync(configPath, 'utf8');
      globalConfig = YAML.parse(configContent);
    } catch (err) {
      console.error('Error parsing config.yaml:', err);
    }
  }

  const outputDir = path.resolve(process.cwd(), 'public');
  const fileName = path.basename(yamlPath, path.extname(yamlPath));
  const outputHTMLPath = path.join(outputDir, `${fileName}.html`);

  const yamlContent = fs.readFileSync(yamlPath, 'utf8');
  const data = YAML.parse(yamlContent);

  if (!data.template) {
    console.error(`Error in ${yamlPath}: The required 'template' field is missing.`);
    return;
  }
  const templateName = data.template+'.ejs' || 'default.ejs'; 
  const templatePath = path.join(process.cwd(), 'templates', templateName);

  if (!fs.existsSync(templatePath)) {
    console.error(`Error: Template file not found at ${templatePath}`);
    return; 
  }
  const template = fs.readFileSync(templatePath, 'utf8');

  const safeData = {
    site: globalConfig,
    page: {
      title: data.title || "Sem título",
      theme: data.theme || globalConfig.theme || "light",
      ...data
    }
  };

  const layoutsDir = path.join(process.cwd(), 'layouts');
  const html = renderWithLayout(template, safeData, layoutsDir);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(outputHTMLPath, html);
  console.log(`Generated: ${outputHTMLPath}`);
}



function renderWithLayout(templateContent, data, layoutsDir) {
  const layoutRegex = /<%#*\s*layout\s*=\s*['"]([^'"]+)['"]\s*-?%>\n?/;
  const layoutMatch = templateContent.match(layoutRegex);

  let finalHtml = templateContent;
  let layoutName = null;

  if (layoutMatch) {
    layoutName = layoutMatch[1];
    finalHtml = templateContent.replace(layoutRegex, '');
  }

  const renderedContent = ejs.render(finalHtml, data);

  if (!layoutName) {
    return renderedContent;
  }

  const layoutPath = path.join(layoutsDir, layoutName + '.ejs');
  
  try {
    const layoutContent = fs.readFileSync(layoutPath, 'utf8');
    const layoutData = { ...data, content: renderedContent };
    return ejs.render(layoutContent, layoutData);
  } catch (err) {
    console.error(`Error processing layout ${layoutPath}:`, err);
    return renderedContent;
  }
}


module.exports = ssg;
