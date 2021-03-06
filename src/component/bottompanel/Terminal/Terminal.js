import React, {Component} from 'react'
import {Terminal} from 'xterm';
import  'xterm/dist/xterm.css';
import * as fit from 'xterm/lib/addons/fit/fit';
import io from 'socket.io-client';

Terminal.applyAddon(fit);

export default class TerminalInstance extends Component{

    config = {
        terminal: {
          scrollback: 1000,
          theme:{"background":"#1e1e1e","foreground":"#cccccc","cursor":"#cccccc","cursorAccent":"#1e1e1e","selection":"rgba(255, 255, 255, 0.25)","black":"#000000","red":"#cd3131","green":"#0dbc79","yellow":"#e5e510","blue":"#2472c8","magenta":"#bc3fbc","cyan":"#11a8cd","white":"#ffffff","brightBlack":"#666666","brightRed":"#f14c4c","brightGreen":"#23d18b","brightYellow":"#f5f543","brightBlue":"#3b8eea","brightMagenta":"#d670d6","brightCyan":"#29b8db","brightWhite":"#e5e5e5"},
          drawBoldTextInBrightColors: true,
          fontFamily: "Consolas, 'Courier New', monospace",
          fontWeight: "normal",
          fontWeightBold: "bold",
          fontSize: "18",
          letterSpacing: 0,
          lineHeight: 1,
          bellStyle: 'none',
          macOptionIsMeta: false,
          macOptionClickForcesSelection: false,
          rightClickSelectsWord: false,
          rendererType: "canvas",
          experimentalCharAtlas: 'dynamic'
        }
    }
    componentDidMount(){
        var $component = this;
        var term = new Terminal(this.config.terminal);
        term.open(this.refs.terminal);
        term.fit();
        term.on('data', data => {
            socket.emit('processData', {id:1, data: data})
          })
  
  
        var socket = io('http://127.0.0.1:5000', {
          path: '/'
        });
        
        var terminalRect = document.querySelector('#terminal').getClientRects()[0]
        var shellLaunchConfig = Object.assign({},
          evaluateColsAndRows(term, terminalRect.width, terminalRect.height, {
                                                                                fontFamily: "Consolas, 'Courier New', monospace",
                                                                                fontWeight: "normal",
                                                                                fontWeightBold: "bold",
                                                                                fontSize: "18",
                                                                              }
          )
        )
        socket.on('connect', function(){
          socket.emit('init', shellLaunchConfig);
        });
        socket.on('processData', function(data){
          var id = data.id;
          var data = data.data;
          term.write(data);
        });
        socket.on('disconnect', function(){
          console.log('disconnect');
        });
          
        function evaluateColsAndRows(xterm, width, height, font){
          if(!width || !height){
            return null;
          }
  
          var charSize =  getCharSize(xterm, font);
          var scaledWidthAvailable = width * window.devicePixelRatio;
          var scaledCharWidth = Math.floor( charSize.width * window.devicePixelRatio) + $component.config.terminal.letterSpacing
          const scaledHeightAvailable = height * window.devicePixelRatio;
          var scaledLineHeight = Math.floor( charSize.height * window.devicePixelRatio)
          return {
            rows: Math.max(Math.floor(scaledHeightAvailable / scaledLineHeight), 1),
            cols: Math.max(Math.floor(scaledWidthAvailable / scaledCharWidth), 1)
          }
        }
  
        function getCharSize(xterm){
          if(xterm && xterm._core.charMeasure){
            return {
              height: xterm._core.charMeasure.height,
              width: xterm._core.charMeasure.width
            }
          }
        }
    }
    render(){
        return <div ref="terminal" id="terminal"></div>;
    }
}