const EventEmitter = require('events');
const executable = "C:\\WINDOWS\\System32\\cmd.exe"
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
                                shellLaunchConfig.baseDir ? shellLaunchConfig.baseDir : process.env.cwd,
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

    destory(){
        for(let key in this.terminalProcessList){
            this.terminalProcessList[key].destory();
        }
    }
}
