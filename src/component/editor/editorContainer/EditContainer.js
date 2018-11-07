import React, {Component} from 'react';
import * as monaco from 'monaco-editor';
import eventBus from '../../../eventBus'

export default class EditContainer extends Component{
    state={
        file:{},
        _openViews: {},
        container: <div class="editor-container"></div>
    }
    componentDidMount(){
        var $component = this;
        eventBus.on('open.file', ({file}) => {
            if(file.path === $component.state.file.path){
                return;
            }
            $component.setState({file: file})
            if($component.state._openViews[$component.state.file.path]){
                $component.state.container.appendChild($component.state._openViews[$component.state.file.path]);
            }else{
                // var $editorInstance =  document.querySelector('.editor-container .editor-instance');
                // $component.state._openViews[$component.state.file.path] = ;
                // var editor = monaco.editor.create(document.querySelector('.editor-container'), {
                //     value: file.content,
                //     language: 'javascript'
                // });
            }
        })
    }
    render(){
        return this.state.container;
    }
}