import React, {Component} from 'react';
import * as monaco from 'monaco-editor';
import eventBus from '../../../eventBus';
import {updateFileContent} from '../../../service/fileService';
import {FILETYPE} from '../../../Constant';



export default class EditContainer extends Component{
    state={
        _openViews: {},
        showFile:{},
        showEditorInstance:null,
        showEditorInstanceView:null,
    }
    componentDidMount(){
        var $component = this;
        var $editContainer = document.querySelector('.editor-container');
        eventBus.on('open.file', ({file}) => {
            if(file.path === $component.state.showFile.path){
                return;
            }
            removeEditInstanceDom();
            if($component.state._openViews[file.path]){
                $editContainer.appendChild($component.state._openViews[file.path].showEditorInstanceView);
            }else{
                var newEditInstanceView = document.createElement('div');
                newEditInstanceView.className = 'edit-instance';
                $editContainer.appendChild(newEditInstanceView);
                var newEditInstance = instanceNormalEditor(newEditInstanceView, file);
                $component.setState({showEditorInstance: newEditInstance, showEditorInstanceView: newEditInstanceView});
                $component.state._openViews[file.path] = {
                    showEditorInstance: newEditInstance,
                    showEditorInstanceView: newEditInstanceView
                }
            }
            eventBus.emit('open.tab', {file})
        })

        eventBus.on('save.file', ({file}) => {
            var editor = $component.state._openViews[file.path].showEditorInstance;
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

        eventBus.on('close.file', async ({file}) => {
            if(file.hasChange){
                var  confirm = window.confirm('该文件已修改，是否保存？');
                if(confirm){
                    var result = await eventBus.emit('save.file', {file: file});
                    result = result.some(tmp => {
                        return tmp === false
                    })
                    if(result){
                        closeFile({file});
                    }
                }else{
                    closeFile({file});
                }
            }
            closeFile({file});

            function closeFile({file}){
                delete $component.state._openViews[file.path]
                var newState = {_openViews: $component.state._openViews};
                if(file.show){
                    removeEditInstanceDom();
                    Object.assign(newState, {showFile: {}, showEditorInstance: null, showEditorInstanceView: null});
                }
                $component.setState(newState);
                eventBus.emit('close.tab', {file});
            }
        })

        function removeEditInstanceDom(){
            var $editorInstance = document.querySelector('.edit-instance');
            if($editorInstance){
                $editorInstance.remove();
            };
        }

        function instanceDiffEditor(view, leftFile, rightFile){

        }

        function instanceNormalEditor(view, file){
            var suffix = getSuffix(file.name);
            var fileType = FILETYPE[suffix] ? FILETYPE[suffix] : suffix;
            var editor = monaco.editor.create(view, {
                value: file.content,
                theme:'vs-dark',
                language: fileType,
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

        function getSuffix(fileName){
            var suffixIndex = fileName.lastIndexOf('.');
            var suffix = fileName;
            if(suffixIndex !== -1){
                suffix = fileName.substring(suffixIndex+1);
            }
            return suffix;
        }
    }
    render(){
        return <div class="editor-container"></div>;
    }
}