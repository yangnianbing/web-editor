import React, {Component} from 'react';
import './Editor.css'
import Tabs from './tabs/Tabs'
import EditorContainer from './editorContainer/EditContainer'

export default class Editor extends Component{
    state = {

    }
    render(){
        return <div class="part editor">
                    <div class="tabs">
                        <Tabs></Tabs>
                    </div>
                    <EditorContainer></EditorContainer>
                </div>
    }
}
