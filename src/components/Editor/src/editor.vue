<template>
  <div class="editor">
    <Tabs type="card" v-model="currentShowFileIndex" addable>
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
import Vue from 'vue'
import {Tabs, TabPane} from 'element-ui'
import {mapMutations} from 'vuex'

export default{
  components: {
    MonacoEditor, Tabs, TabPane
  },
  mounted () {
    var $vue = this;

    $vue.$store.state.$eventBus.$on('file-open', (callback, params) => {
      $vue.setFile(params);
      Vue.set($vue.openFiles, $vue.openFiles.length, params)
      $vue.length = $vue.openFiles.length;
    })
  },
  methods: {
    ...mapMutations(['setFile'])
  },
  computed: {
    currentShowFileIndex: function () {
      return this.length - 1;
    }
  },
  data () {
    return {
      editors: [],
      length: 1,
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
