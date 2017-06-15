import { MessageBox } from 'element-ui';

import {Message, Action} from '../comet/Message'
 
function saveFile(){
    var $store = this.$store;
    var currentSelectFile = $store.state.currentSelectFile;
    var currentShowFile = $store.state.currentShowFile;
    var path = currentSelectFile.isFolder ? currentSelectFile.path : currentSelectFile.path.substring(0, currentSelectFile.path.lastIndexOf('/') + 1);
    
    MessageBox.prompt('请输入路径', '保存', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue : path
    }).then(({ value }) => {
            var message = new Message(Action.FILE_ADD, {content:currentShowFile.content});
            $store.dispatch('crudmFile', message);
        }).catch(e => {
            console.log(e,'cancel save');
        })
}

export default saveFile;