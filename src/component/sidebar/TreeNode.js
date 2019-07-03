import React, {Component} from 'react';
import util from '@yangnb/jsutil_'
import Tree from './Tree';
import eventBus from '../../eventBus'
import {queryFileContentFragment} from '../../service/graphql'; 
import PropTypes from 'prop-types'


var STATUS_EXPAND = 1;
var STATUS_UN_EXPAND = 2;

class TreeNodeIcon extends Component{
    state={
        ...this.props
    }
    render(){
        if(this.state.file.isDirectory){
            return <i  className={this.state.file.status === STATUS_EXPAND ?  "expand-status iconfont icon-expand" : "expand-status iconfont icon-un-expand"}></i>
        }
        return <i class="file-icon iconfont icon-file-icon"></i>;
    }
}


export default class TreeNode extends Component{
    static contextTypes = {
        client: PropTypes.Requireable
    }
    state = {
        ...this.props
    }
    render(){
        return <li key={this.state.key}>
        <div title={this.state.file.name} class="wholerow" onClick={this.treeItemClickHander.bind(this)}>&nbsp;</div>
        <TreeNodeIcon file={this.state.file}></TreeNodeIcon>
        <span>{this.state.file.name}</span>
        {
            this.state.file.status === STATUS_EXPAND ? <Tree file={this.state.file}></Tree>:''
        }
      </li>
    }

     treeItemClickHander(){
        var $component = this;
        if(this.state.file.isDirectory === true){
           directoryClick();
        }else{
          fileClick();
        }
    
        function directoryClick(){
          util.toggleAttr($component.state.file, 'status', [STATUS_EXPAND, STATUS_UN_EXPAND]);
          $component.setState({file:$component.state.file});
        }
    
        function fileClick(){
            $component.context.client.query({
                query: queryFileContentFragment,
                variables: $component.state.file
            }).then(({data}) => {
                $component.state.file.content = data.fileContent.content
                eventBus.emit('open.file', {file:$component.state.file});
            })
        }
      }
}