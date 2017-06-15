<template>
        <div class="ide-right-content ide-section">
                <Tabs v-model="currentShowFile.path" type="card"  addable @tab-click="handleTabClick"  @edit="handleTabsEdit">
                    <TabPane  v-for="file in openFiles" :key="file.path" closable  :label="file.name" :name="file.path">
                            <MonacoEditor
                                height="100%"
                                language="typescript"
                                srcPath="/public/monaco-editor/dev"
                                :changeThrottle="1000"
                                theme="vs-light"
                                @mounted="onMounted"
                                @codeChange="onCodeChange"
                            >
                    </TabPane>
                    <TabPane :disabled="false" :closable="false">
                            <span slot="label"><i class="el-icon-date"></i> </span>
                    </TabPane>
                </Tabs>
        </div>
        
</template>

<script>
import MonacoEditor from 'vue-monaco-editor'
import FileTable from './fileTable'
import LanguageUtil from '../util/suffixMapLanguage'
import {mapState} from 'vuex'

import {Tabs, TabPane} from 'element-ui'

module.exports = {
    components: {
        MonacoEditor,FileTable, Tabs, TabPane
    },
    data() {
        return {

        };
    },
    computed : {
        currentShowFile : function(){
            var $vue = this;
            $vue.$children.forEach(function(child){
                child.$emit('selectTab', $vue.$store.state.currentShowFile.path);
            })
            return $vue.$store.state.currentShowFile;
        },
        ... mapState({
            openFiles : state => state.openFiles,
        })
    },
    methods: {
        onMounted(editor) {
            this.editor = editor;
        },
        onCodeChange(editor) {
            this.$store.state.currentShowFile.content = this.editor.getValue();
            this.$store.commit('setCurrentShowFile', {currentShowFile :this.$store.state.currentShowFile});
        },
        handleTabsEdit(targetName, action){
            if(action === 'remove' ){

            }
        },
        handleTabClick(){
            console.log(arguments, 'click');
            return false;
        }
    },
};
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