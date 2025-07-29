const { program } = require('commander');
const path = require('path');
const fs = require('fs');
const ssg = require('../ssg');
const serve = require('../server');

program
  .command('render')
  .description('Renderiza todos os arquivos YAML da pasta content/')
  .action(() => {
    const contentDir = path.resolve('content');
    const files = fs.readdirSync(contentDir);

    files.forEach((file) => {
      if (file.endsWith('.yaml') || file.endsWith('.yml')) {
        const fullPath = path.join(contentDir, file);
        console.log(`Renderizando ${file}...`);
        ssg(fullPath);
      }
    });
  });

program
  .command('serve <yaml>')
  .description('Inicia um servidor local com live reload')
  .action((yamlPath) => {
    const fullPath = path.resolve('content', yamlPath);
    serve(fullPath);
  });

program.parse(process.argv);
