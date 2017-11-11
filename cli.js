#!/usr/bin/env node
const commander = require('commander');
const deets = require('./index');

commander.version('0.1.5');
commander.command('[value]', { isDefault: true })
  .description('Returns details on the provided NPM package')
  .action((name) => {
    deets(name);
  });

commander.parse(process.argv);