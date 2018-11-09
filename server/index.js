const program = require('commander');
const server = require('./server');
const socketServer = require('./socket-server')
const path = require('path');

program
    .option('-d, --directory [directory]', '目录')
    .action(param => {
        var baseDir = param.directory ? param.directory : './';
        var absoluteDir = path.resolve(baseDir);
        server({baseDir: absoluteDir})
        socketServer({baseDir: absoluteDir})
    })
  .parse(process.argv)