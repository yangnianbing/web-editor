import { MessageBox, Message as Tip } from 'element-ui';

import {Message, Action} from '../comet/Message'
import Constants from '../util/Constants'
 
function saveFile(){
    var $store = this.$store;
    var currentSelectFile = $store.state.currentSelectFile;
    var currentShowFile = $store.state.currentShowFile;
    var path = !currentSelectFile.path ? '' : currentSelectFile.isFolder ? currentSelectFile.path : currentSelectFile.path.substring(0, currentSelectFile.path.lastIndexOf(Constants.fileSeperate) + 1);
    path && !path.endsWith(Constants.fileSeperate) && (path += Constants.fileSeperate);
    MessageBox.prompt('请输入路径', '保存', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue : path,
        beforeClose(action, instance, done){
            if(action == 'cancel'){
                done();
                return;
            }
            var inputValue = instance.inputValue;
            var isRight = false;
            Object.keys($store.state.files).every(key => {
                if(value.startsWith(key + Constants.fileSeperate)){
                    isRight = true;
                    return false
                }
                return true;
            })
            if(isRight){
                done();
            }else{
                Tip.warning({
                    message : '文件必须保存在某一目录下'
                })
            }
        }
    }).then(({ value }) => {
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