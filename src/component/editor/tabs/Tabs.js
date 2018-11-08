import React, {Component} from 'react';
import eventBus from '../../../eventBus'

export default class Tabs extends Component{
    state = {
        files: []
    }
    render(){
        return <div class="file-tabs">
            {
                this.state.files.map((file, index) => {
                    return <Tab file={file} key={index} closeFile={this.closeFile}></Tab>
                })
            }
        </div>
    }
    closeFile(file){
        if(file.hasChange){
            var  confirm = confirm('该文件已修改，是否保存？');
            if(confirm){
                eventBus.emit('save.file', {file: file});
            }else{

            }
        }
    }
    componentDidMount(){
        var $component = this;
        eventBus.on('open.file', function({file}){
            var areadyOpen = false;
            $component.state.files.forEach(areadyOpenFile => {
                areadyOpenFile.show = false;
                if(areadyOpenFile.path === file.path){
                    areadyOpen = true;
                    areadyOpenFile.show = true;
                }
            })
            var openFiles = [...$component.state.files];
            if(!areadyOpen){
                file.show = true;
                openFiles.push(file);
            }
            $component.setState({ 'files': openFiles})
        })
    }
}

export class Tab extends Component{
    render(){
        return <div className={this.props.file.show ? 'tab selected' : 'tab'}>
            <i></i>
            <span>{this.props.file.name}</span>
            <i class="iconfont icon-close" onClick={this.props.closeFile.bind(this, this.props.file)}></i>
        </div>
    }
}