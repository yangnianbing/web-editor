<template>
        <div class="ide-right-content ide-section">
                <Tabs v-model="currentShowFileIndex" type="card"  addable @tab-click="handleTabClick"  @edit="handleTabsEdit">
                    <TabPane v-for="(file,index) in openFiles" :key="'' + index" closable  :label="file.name" :name="'' + index">
                            <MonacoEditor
                                height="100%"
                                language="typescript"
                                srcPath="/public/monaco-editor/dev"
                                :changeThrottle="1000"
                                theme="vs-light"
                                @mounted="onMounted"
                                @codeChange="onCodeChange"
                            ></MonacoEditor>
                    </TabPane>
                    <TabPane :disabled="false" :closable="false">
                            <span slot="label"><i class="add-button icon-add iconfont"></i> </span>
                    </TabPane>
                </Tabs>
        </div>
        
</template>

<script>
import MonacoEditor from 'vue-monaco-editor'
import LanguageUtil from '../util/suffixMapLanguage'
import {mapState} from 'vuex'

import {Tabs, TabPane, MessageBox} from 'element-ui'

module.exports = {
    components: {
        MonacoEditor, Tabs, TabPane
    },
    data() {
        return {
        };
    },
    computed : {
        ... mapState({
            currentShowFile : state => state.currentShowFile,
            currentShowFileIndex(state){
                var currentIndex = state.openFiles.length-1;
                state.openFiles.every(function(file, index){
                    if(file.path == currentIndex.path){
                        currentIndex = index;
                        return false;
                    }
                    return true;
                })
                return currentIndex+'';
            },
            openFiles : state => state.openFiles,
        })
    },
    methods: {
        onMounted(editor) {
            this.editor = editor;
        },
        onCodeChange(editor) {
            this.$store.state.currentShowFile.content = this.editor.getValue();
            //this.$store.commit('setCurrentShowFile', {currentShowFile :this.$store.state.currentShowFile});
        },
        handleTabsEdit(targetName, action){
            var $eventBus = this.$store.state.$eventBus;
            if(action === 'remove' ){
                var toBeRemove = this.openFiles[targetName];
                if(toBeRemove.type == 'tmp'){
                    MessageBox.confirm('关闭之前是否保存文件', '关闭', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(() => {
                        $eventBus.$emit('saveFile')
                    })
                }else{
                    this.openFiles.splice(parseInt(targetName),1);
                }
            }
        },
        handleTabClick(tab, evt){
            var $vue = this;
            var $eventBus = $vue.$store.state.$eventBus;
            console.log(tab);
            if(isAddButton(evt.target)){
                 $eventBus.$emit('createFile');
            }else{
                console.log($vue.$store.state.openFiles[tab.index]);
                $vue.$store.commit('setCurrentShowFile', {currentShowFile:$vue.$store.state.openFiles[tab.index]})
            }
        }
    },
};

function isAddButton(target){
    return target.querySelectorAll('i.add-button').length > 0;
}
</script>

<style lang="css">
    .ide-right-content{
        width:80%;
        height:100%;
        right:0px;
    }

    .ide-right-content .el-tabs{
        height : 100%;
    }

    .ide-right-content .el-tabs .el-tab-pane{
        height: 100%;
    }

     .ide-right-content .el-tabs .el-tabs__content{
         height : calc(100% - 42px)
     }

     .ide-right-content .el-tabs .el-tabs__header{
         margin-bottom: 1px;
     }

     .ide-right-content .el-tabs .el-tabs__header .el-tabs__nav:last-child {
         margin-bottom: 1px;
     }

</style>