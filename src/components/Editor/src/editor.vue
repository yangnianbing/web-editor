<template>
  <div class="editor">
    <Tabs type="card"  addable>
      <TabPane v-for="(file,index) in openFiles" :key="'' + index" closable  :label="file.name" :name="'' + index">
        <MonacoEditor
          height="100%"
          language="typescript"
          srcPath="/static/monaco-editor/dev"
          :changeThrottle="1000"
          theme="vs-light"
          ></MonacoEditor>
      </TabPane>
    </Tabs>
  </div> 
</template>

<script>
import MonacoEditor from 'vue-monaco-editor'

import {Tabs, TabPane} from 'element-ui'

export default{
  components: {
    MonacoEditor, Tabs, TabPane
  },
  mounted () {
    var $vue = this;

    $vue.$store.state.$eventBus.$on('file-open', (callback, params) => {
      
    })
  },
  data () {
    return {
      currentShowFileIndex: 0,
      editors: [],
      openFiles: [{name: 'test'}]
    }
  }
}
</script>

<style lang="css">
  .editor{
    height: 100%;
  }

  .editor .el-tabs--card{
    height: 100%;
  }

  .editor .el-tabs__content{
    position: absolute;
    top: 36px;
    bottom: 0px;
    width: 100%
  }

  .editor .el-tabs__header{
    height: 35px;
    margin:0px;
  }

  .editor .el-tabs__content .el-tab-pane{
    height: 100%;
  }

  .editor .el-tabs__item{
    height: 35px;
  }
</style>
