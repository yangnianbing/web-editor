const path = require('path');
const pty = require('node-pty');

const EventEmitter = require('events');

module.exports = class TerminalProcess extends EventEmitter {
    constructor (shellLaunchConfig, cwd, cols, rows, env) {
        super();
        var options = {
            name: path.basename(shellLaunchConfig.executable),
            cwd,
            env,
            cols,
            rows
        }


        try {
            this._ptyProcess = pty.spawn(shellLaunchConfig.executable, shellLaunchConfig.args, options);
        }catch (e) {
            console.log(e);
        }

        var i = 0
        this._ptyProcess.on('data', (data) => {
            this.emit('processData', data)
        })

        this._ptyProcess.on('exit', (code) => {

        })
    }

    input(data){
        this._ptyProcess.write(data);
    }
};
