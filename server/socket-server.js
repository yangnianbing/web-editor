const server = require('http').createServer();
const Terminal = require('./terminal/terminal');

module.exports = function({baseDir}){
    const io = require('socket.io')(server, {
        path: '/',
        serveClient: false,
        // below are engine.IO options
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false
      });
      
    io.on('connect', socket => {
        console.log('connect')
        const terminalManager = new Terminal(socket);
        socket.on('init', data => {
            terminalManager.createTerminalInstance({cols: data.cols, rows: data.rows, cwd: baseDir});
            terminalManager.input({id:1, data:''})
        })

        socket.on('processData', data => {
            terminalManager.input(data)
        })

        socket.on('disconnect',  data => {
            terminalManager.destory();
        })
    })

      server.listen(5000, function(){
          console.log('socket server listening 5000')
      })
}
