// const Koa = require('koa');
// const app = new Koa();
const server = require('http').createServer();
const Terminal = require('./terminal/terminal');

const io = require('socket.io')(server, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

io.on('connect', socket => {
    console.log(socket);
    const terminalManager = new Terminal(socket);
    socket.on('init', data => {
        terminalManager.createTerminalInstance({cols: data.cols, rows: data.rows});
        terminalManager.input({id:1, data:''})
    })

    socket.on('processData', data => {
        terminalManager.input(data)
    })
})

server.listen(3000);