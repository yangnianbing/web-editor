import React, {Component} from 'react';
import util from '@yangnb/jsutil_'
import Tree from './Tree';

var STATUS_EXPAND = 1;
var STATUS_UN_EXPAND = 2;

export default class TreeNode extends Component{
    state = {
        ...this.props
    }
    render(){
        return <li key={this.state.key} onClick={this.treeItemClickHander.bind(this)}>
        <div class="wholerow">&nbsp;</div>
        {this.state.file.isDirectory === true ? <i class="expand-status iconfont icon-expand"></i> : ''}
        {this.state.file.isDirectory === false ? <i class="file-icon iconfont icon-file-icon"></i> : ''}
        <span>{this.state.file.name}</span>
        {
            this.state.file.state === STATUS_EXPAND ? <Tree></Tree>:''
        }
      </li>
    }

    async treeItemClickHander(){
        var $component = this;
        if(this.state.file.isDirectory === true){
          await directoryClick();
        }else{
          fileClick();
        }
    
         async function directoryClick(file){
          util.toggleStatus($component.state.file, 'status', [STATUS_EXPAND, STATUS_UN_EXPAND]);
          $component.setState({file:$component.state.file});
        }
    
        function fileClick(file){
          
        }
      }
}