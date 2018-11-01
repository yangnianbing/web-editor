const path = require('path');
const pty = require('node-pty');

module.exports = class TerminalProcess {
    constructor (shellLaunchConfig, cwd, cols, rows, env) {
        var options = {
            name: path.basename(shellLaunchConfig.executable),
            cwd,
            env: process.env,
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
            console.log(data);
        })

        this._ptyProcess.on('exit', (code) => {
        })
    }
};
