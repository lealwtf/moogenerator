#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const ssg = require('../ssg');
const serve = require('../server')

program
  .command('render <yaml>')
  .description('Renders an YAML file into HTML')
  .action((yamlPath) => {
    const fullPath = path.resolve('content',yamlPath);
    ssg(fullPath);
  });

program
  .command('serve <yaml>')
  .description('Inicia um servidor local com live reload')
  .action((yamlPath) => {
    const fullPath = path.resolve('content', yamlPath);
    serve(fullPath);
  });

program.parse(process.argv);
