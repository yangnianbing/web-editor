import React, {Component} from 'react';
import './Titlebar.css';
import {baseDir} from '../../service/graphql'; 
import util from '@yangnb/jsutil_'
import eventBus from '../../eventBus';
import { Query } from 'react-apollo';

class Titlebar extends Component {
  state = {
    file: {}
  }
  render(){
    return <Query query={baseDir}>
        {
          ({loading, error, data}) => {
            return <div class="part titlebar">
            <div class="logo"></div>
            <div class="menubar">
              <div class="menubar-menu-button">
                <div class="menubar-menu-title">文件(<mnemonic>F</mnemonic>)</div>
              </div>
              <div class="menubar-menu-button">
                <div class="menubar-menu-title">编辑(<mnemonic>E</mnemonic>)</div>
              </div>
              <div class="menubar-menu-button">
                <div class="menubar-menu-title">选择(<mnemonic>S</mnemonic>)</div>
              </div>
              <div class="menubar-menu-button">
                <div class="menubar-menu-title">查看(<mnemonic>V</mnemonic>)</div>
              </div>
              <div class="menubar-menu-button">
                <div class="menubar-menu-title">转到(<mnemonic>G</mnemonic>)</div>
              </div>
              <div class="menubar-menu-button">
                <div class="menubar-menu-title">调试(<mnemonic>D</mnemonic>)</div>
              </div>
              <div class="menubar-menu-button">
                <div class="menubar-menu-title">终端(<mnemonic>T</mnemonic>)</div>
              </div>
              <div class="menubar-menu-button">
                <div class="menubar-menu-title">帮助(<mnemonic>H</mnemonic>)</div>      
              </div>
            </div>
            <div class="window-title">{this.state.file.name ?  (this.state.file.name + ' - '):''}{data.baseDir ? data.baseDir.name : ''} - Visual Studio Code</div>
            <div class="window-control-container">
              <div class="window-icon-bg">
                <div class="window-icon window-min"></div>
              </div>
              <div class="window-icon-bg">
                <div class="window-icon window-max" onClick={this.windowMax.bind(this)}></div>
              </div>
              <div class="window-icon-bg">
                <div class="window-icon window-close"></div>
              </div>
            </div>
          </div>
          }
        }
      </Query>
  }

  windowMax(evt){
    toggleFullScreen();
    util.toggleClass(evt.target, 'window-store');
    function toggleFullScreen(){
      if(canFullScreen()){
        if(isFullScreen()){
          cancelFullScreen();
        }else{
          beFullScreen()
        }
      }
    }

    function canFullScreen(){
      return document.webkitFullscreenEnabled;
    }

    function isFullScreen(){
      return document.webkitIsFullScreen;
    }

    function cancelFullScreen(){
      document.webkitCancelFullScreen();
    }

    function beFullScreen(){
      document.documentElement.webkitRequestFullScreen();
    }
  }

  componentDidMount(){
    var $component = this;
    eventBus.on('open.file', ({file}) => {
      $component.setState({'file': file});
    })
  }
}


export default Titlebar;

