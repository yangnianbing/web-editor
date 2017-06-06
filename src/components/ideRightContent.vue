<template>
        <div class="ide-right-content ide-section">
                <Tabs>
                    <Tab :name="file.name" :id="file.path" v-for="file in openFiles">
                             <MonacoEditor
                                height="100%"
                                language="typescript"
                                srcPath="/public/monaco-editor/min"
                                :changeThrottle="500"
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
module.exports = {
    components: {
        MonacoEditor,FileTable, Tabs, Tab
    },
    data() {
        return {

        };
    },
    computed : {
        openFiles (){
            var $vue = this;
            this.$children.forEach(function(child){
                child.$emit('selectTab', $vue.currentShowFile.path);
            });
            return this.$store.state.openFiles;
        },
        ... mapState({
            currentShowFile:state => state.currentShowFile 
        })
    },
    // computed : mapState({
    //         openFiles : state => state.openFiles,
    //         currentShowFile (state){
    //             console.log(1111);
    //         }
    // }),
    methods: {
        onMounted(editor) {
            console.log('after mount!', editor, editor.getValue(), editor.getModel());
            this.editor = editor;
        },
        onCodeChange(editor) {
            console.log('code changed!', 'code:' + this.editor.getValue());
        },
        clickHandler() {
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