import React, {Component} from 'react'
import './Sidebar.css'
import Tree from './Tree';
import util from '@yangnb/jsutil_';

export default class  Sidebar extends Component {
  state = {
    path: ''
  }
  render(){
    return <div class="part sidebar">
                  <div class="sidebar-title">
                    <div class="title-label">
                      <span>资源管理器</span>
                    </div>
                    <div class="title-actions"></div>
                  </div>
                  <div class="sidebar-content">
                    <div class="section open-file">
                      <div class="header expand" onClick={this.toggleSelection.bind(this)}>
                        <i class="expand-status iconfont icon-expand"></i>
                        <span>打开的编辑器</span>
                      </div>
                      <div class="content">
                          <ul>
                            <li class="selected"><span>index.html</span></li>
                            <li><span>index.css</span></li>
                          </ul>
                      </div>
                    </div>
                    <div class="section file-tree">
                      <div class="header expand" onClick={this.toggleSelection.bind(this)}>
                        <i class="expand-status iconfont icon-expand"></i>
                        <span>CODE</span>
                      </div>
                      <div class="content">
                        <Tree></Tree>
                      </div>
                    </div>
                    <div class="section out-line">
                      <div class="header expand" onClick={this.toggleSelection.bind(this)}>
                        <i class="expand-status iconfont icon-expand"></i>
                        <span>大纲</span>
                      </div>
                      <div class="content hide"></div>
                    </div>
                  </div>
                </div>
   
  }

  toggleSelection(e){
    var $target = e.currentTarget;
    var $icon = $target.querySelector('i.expand-status');
    util.toggleClass($icon, 'icon-expand')
    util.toggleClass($icon, 'icon-un-expand')
    var $thisContent = $target.nextSibling;
    util.toggleClass($thisContent, 'hide');
  }
}