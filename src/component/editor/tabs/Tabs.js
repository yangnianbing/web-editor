import React, {Component} from 'react';
import eventBus from '../../../eventBus'
import util from '@yangnb/jsutil_'

export default class Tabs extends Component{
    state = {
        files: []
    }
    render(){
        return <div class="file-tabs">
            {
                this.state.files.map((file, index) => {
                    return <Tab file={file} key={index}></Tab>
                })
            }
        </div>
    }

    componentDidMount(){
        var $component = this;
        eventBus.on('open.tab', ({file}) => {
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

        eventBus.on('close.tab',  ({file}) => {
            util.remove($component.state.files, function(tmp){
                return tmp.path === file.path;
            })
            if(file.show && $component.state.files.length){
                var lastFile = $component.state.files[$component.state.files.length - 1];
                lastFile.show = true;
                eventBus.emit('open.file', {file: lastFile});
            }
            $component.setState({files: $component.state.files})
        })

    }
}

export class Tab extends Component{
    render(){
        return <div className={this.props.file.show ? 'tab selected' : 'tab'} onClick={this.click.bind(this)}>
            <i></i>
            <span>{this.props.file.name}</span>
            <i class="iconfont icon-close"></i>
        </div>
    }

    click(e){
        var target = e.target;
        if(target.classList.contains('icon-close')){
            eventBus.emit('close.file', {file: this.props.file})
        }else{
            eventBus.emit('open.file', {file: this.props.file})
        }
    }
}