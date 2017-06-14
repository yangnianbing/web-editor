<template>
        <div class="ide-right-content ide-section">
                <Tabs>
                    <Tab :name="file.name" :id="file.path" v-for="file in openFiles" :select='file.path == currentShowFile.path ? true : false'>
                             <MonacoEditor
                                height="100%"
                                language="typescript"
                                srcPath="/public/monaco-editor/dev"
                                :changeThrottle="1000"
                                theme="vs-light"
                                @mounted="onMounted"
                                @codeChange="onCodeChange"
                            >
                    </Tab>
                </Tabs>  
        </div>
        
</template>

<script>
    import MonacoEditor from 'vue-monaco-editor'
    import FileTable from './fileTable'
    import LanguageUtil from '../util/suffixMapLanguage'
    import Tabs from './Tabs'
    import Tab from './Tab'
    import {mapState} from 'vuex'

    import {send} from '../comet/comet'
    import {Message, Action} from '../comet/Message'
    import { MessageBox } from 'element-ui';

module.exports = {
    components: {
        MonacoEditor,FileTable, Tabs, Tab
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

    created(){
        var $vue = this;
        window.addEventListener('keydown', e => {
            if( e.ctrlKey  == true && e.keyCode == 83 ){
                if($vue.$store.state.currentShowFile.type == 'tmp'){
                    this.popupSave();
                }
                e.preventDefault();
            }
        })
    },

    methods: {
        onMounted(editor) {
            this.editor = editor;
        },
        onCodeChange(editor) {
            var message = new Message(Action.FILE_MODIFY, {content:this.editor.getValue()});
            send(message, function(e){

            })
        },
        popupSave(){
            var currentSelectFile = this.$store.state.currentSelectFile;
            var path = currentSelectFile.isFolder ? currentSelectFile.path : currentSelectFile.path;
            MessageBox.prompt('请输入路径', '保存', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue : path
            }).then(({ value }) => {
                    var message = new Message(Action.FILE_ADD, {content:this.editor.getValue()});
                    send(message, function(e){

                    })
                    this.$message({
                        type: 'success',
                        message: '你的邮箱是: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });       
                }
            );
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

    .ide-right-content .tabs-component{
        height: 100%
    }

    .ide-right-content ul.tabs-component-tabs{
        border-bottom: 1px solid #eef2f4;
        margin: 0px;
        padding-left: 0px;
    }

     .ide-right-content ul.tabs-component-tabs li{
        height:30px;
        line-height: 30px;
        display: inline-block;
        padding: 0 10px;
    }

    .ide-right-content ul.tabs-component-tabs li.is-active{
        border-left: 1px solid #eef2f4;
        border-right:1px solid #eef2f4;
        box-shadow: inset 0 2px 0 #00aaef;
    }
    .ide-right-content ul.tabs-component-tabs li a{
        text-decoration: none;
    }

     .ide-right-content div.tabs-component-panels{
         height : calc(100% - 30px)
     }

      .ide-right-content div.tabs-component-panels section.tabs-component-panel{
          height: 100%;
      }

</style>