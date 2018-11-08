import React, {Component} from 'react';
import * as monaco from 'monaco-editor';
import eventBus from '../../../eventBus';
import {updateFileContent} from '../../../service/fileService'


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
                var newEditInstance = instanceNormalEditor(newEditInstanceView, file);
                $component.setState({editorInstance: newEditInstance, editorInstanceView: newEditInstanceView});
                $component.state._openViews[$component.state.file.path] = {
                    editorInstance: newEditInstance,
                    editorInstanceView: newEditInstanceView
                }

            }
        })

        eventBus.on('save.file', ({file}) => {
            var editor = $component.state._openViews[file.path].editorInstance;
            if(file.hasChange){
                file.content = editor.getValue();

                updateFileContent(file).then(({data}) => {
                    if(data.updateFileContent.status !== 0){
                        alert('保存失败')
                        return;
                    }
                    file.hasChange = false;
                });
            }
        })

        function instanceDiffEditor(view, leftFile, rightFile){

        }

        function instanceNormalEditor(view, file){
            var editor = monaco.editor.create(view, {
                value: file.content,
                theme:'vs-dark',
                language: 'javascript',
                fontFamily:'"lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif',
                fontSize:16
            });

            editor.onDidChangeModelContent(e => {
                file.hasChange = true;
            })

            editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function() {
               eventBus.emit('save.file', {file: file})
            });

            return editor;
        }
    }
    render(){
        return <div class="editor-container"></div>;
    }
}