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
    
    if (!fs.existsSync(contentDir)) {
      console.error('Diretório content/ não encontrado');
      return;
    }
    
    const files = fs.readdirSync(contentDir);

    files.forEach((file) => {
      if (file.endsWith('.yaml') || file.endsWith('.yml')) {
        const fullPath = path.join(contentDir, file);
        console.log(`Renderizando ${file}...`);
        try {
          ssg(fullPath);
        } catch (error) {
          console.error(`Erro ao renderizar ${file}:`, error.message);
        }
      }
    });
  });

program
  .command('serve <yaml>')
  .description('Inicia um servidor local com live reload')
  .action((yamlPath) => {
    const fullPath = path.resolve('content', yamlPath);
    
    if (!fs.existsSync(fullPath)) {
      console.error(`Arquivo YAML não encontrado: ${fullPath}`);
      return;
    }
    
    serve(fullPath);
  });

program.parse(process.argv);
