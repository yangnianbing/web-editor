import { MessageBox, Message as Tip } from 'element-ui';

import {Message, Action} from '../comet/Message'
 
function saveFile(){
    var $store = this.$store;
    var currentSelectFile = $store.state.currentSelectFile;
    var currentShowFile = $store.state.currentShowFile;
    var path = !currentSelectFile.path ? $store.state.files.name : currentSelectFile.isFolder ? currentSelectFile.path : currentSelectFile.path.substring(0, currentSelectFile.path.lastIndexOf('/') + 1);
    !path.endsWith('/') && (path += '/');
    MessageBox.prompt('请输入路径', '保存', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue : path
    }).then(({ value }) => {
            if(value.startsWith($store.state.files.name))

            var message = new Message(Action.FILE_ADD, {model:currentShowFile});
            $store.dispatch('crudmFile', message);
        }).catch(e => {
            Tip.warning({
                message : '取消保存'
            })
            console.log(e,'cancel save');
        })
}

export default saveFile;