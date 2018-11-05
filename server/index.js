const program = require('commander');
const server = require('./server');

program
    .option('-d, --directory [directory]', '目录')
    .action(param => {
        server(param)
    })
  .parse(process.argv)