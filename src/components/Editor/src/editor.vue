<template>
  <div class="ide-right-content ide-section">
    <Tabs type="card"  addable>
      <TabPane key="1" closable label="file" name="1">
        <MonacoEditor
        height="100%"
        language="typescript"
        srcPath="/static/monaco-editor/dev"
        :changeThrottle="1000"
        theme="vs-light"
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

import {Tabs, TabPane} from 'element-ui'

export default{
  components: {
    MonacoEditor, Tabs, TabPane
  }
}
</script>

<style lang="css">
  .ide-right-content{
    width: 80%;
    height: 100%;
    right: 0px;
  }

  .ide-right-content .el-tabs{
    height: 100%;
  }

  .ide-right-content .el-tabs .el-tab-pane{
    height: 100%;
  }

   .ide-right-content .el-tabs .el-tabs__content{
    height: calc(100% - 42px);
   }

   .ide-right-content .el-tabs .el-tabs__header{
    margin-bottom: 1px;
   }

   .ide-right-content .el-tabs .el-tabs__header .el-tabs__nav:last-child {
    margin-bottom: 1px;
   }

</style>
