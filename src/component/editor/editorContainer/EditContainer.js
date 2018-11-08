import React, {Component} from 'react';
import * as monaco from 'monaco-editor';
import eventBus from '../../../eventBus'

export default class EditContainer extends Component{
    state={
        file:{},
        _openViews: {},
        editorInstance:null,
        editorInstanceView:null,
    }
    componentDidMount(){
        var $component = this;
        var $editContainer = document.querySelector('.editor-container');
        eventBus.on('open.file', ({file}) => {
            if(file.path === $component.state.file.path){
                return;
            }
            $component.setState({file: file})
            if($component.state._openViews[$component.state.file.path]){
                $editContainer.appendChild($component.state._openViews[$component.state.file.path].editorInstanceView);
            }else{
                if($component.state.editorInstanceView){
                    $editContainer.removeChild($component.state.editorInstanceView);
                }
                var newEditInstanceView = document.createElement('div');
                newEditInstanceView.className = 'edit-instance';
                $editContainer.appendChild(newEditInstanceView);
                var newEditInstance = monaco.editor.create(newEditInstanceView, {
                    value: file.content,
                    language: 'javascript'
                });
                $component.setState({editorInstance: newEditInstance, editorInstanceView: newEditInstanceView});
                $component.state._openViews[$component.state.file.path] = {
                    editorInstance: newEditInstance,
                    editorInstanceView: newEditInstanceView
                }

            }
        })
    }
    render(){
        return <div class="editor-container"></div>;
    }
}