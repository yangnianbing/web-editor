const EventEmitter = require('events');
const executable = "C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
const TerminalProcess = require('./terminalProcess');

module.exports = class Terminal extends EventEmitter{
    constructor(socket){
        super();
        this.index = 0;
        this.terminalProcessList = {};
        this.socket = socket;
    }

    createTerminalInstance(shellLaunchConfig){
        var terminalProcess = new TerminalProcess({"executable":executable},
                                process.env.cwd,
                                shellLaunchConfig.cols,
                                shellLaunchConfig.rows,
                                process.env);

        var uuid = ++this.index;
        this.terminalProcessList[uuid] = terminalProcess;

        terminalProcess.on('processData', data => {
            this.socket.emit('processData', {id: uuid, data: data});
        })
    }

    input(data){
        this.terminalProcessList[data.id].input(data.data);
    }
}
