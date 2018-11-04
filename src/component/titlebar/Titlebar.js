import React, {Component} from 'react';
import './Titlebar.css';


class Titlebar extends Component {
  render(){
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
      <div class="window-title">index.css - web-coder-html - Visual Studio Code</div>
      <div class="window-control-container">
        <div class="window-icon-bg">
          <div class="window-icon window-min"></div>
        </div>
        <div class="window-icon-bg">
          <div class="window-icon window-max"></div>
        </div>
        <div class="window-icon-bg">
          <div class="window-icon window-close"></div>
        </div>
      </div>
    </div>
  }
}


export default Titlebar;

