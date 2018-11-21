import React, {Component} from 'react'
import './Sidebar.css'
import {baseDir} from '../../service/graphql'; 
import Tree from './Tree';
import util from '@yangnb/jsutil_';
import { Query } from 'react-apollo';
import eventBus from '../../eventBus';


export default class  Sidebar extends Component {
  state = {
    path: '',
    files: []
  }
  render(){
    var $component = this;
    return <Query query={baseDir}>
          {
            ({data}) => {
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
                        {
                          $component.state.files.map(file => <li className={file.selected ? 'selected':''}><span>{file.name}</span></li>)
                        }
                        {/* <li class="selected"><span>index.html</span></li>
                        <li><span>index.css</span></li> */}
                      </ul>
                  </div>
                </div>
                <div class="section file-tree">
                  <div class="header expand" onClick={this.toggleSelection.bind(this)}>
                    <i class="expand-status iconfont icon-expand"></i>
                    <span>{data.baseDir ? data.baseDir.name : ''}</span>
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
          }
      </Query>
  }

  toggleSelection(e){
    var $target = e.currentTarget;
    var $icon = $target.querySelector('i.expand-status');
    util.toggleClass($icon, 'icon-expand')
    util.toggleClass($icon, 'icon-un-expand')
    var $thisContent = $target.nextSibling;
    util.toggleClass($thisContent, 'hide');
  }

  componentDidMount(){
    var $component = this;
    eventBus.on('open.file', ({file}) => {
      var openFiles = $component.state.files;
      if(!openFiles.some(thisFile => {
        if(thisFile.path !== file.path){
          return false;
        }else{
          thisFile.selected = true;
          return true
        }
      })){
        openFiles.push(file);
      }
      $component.setState({files: openFiles});
    })
  }
}