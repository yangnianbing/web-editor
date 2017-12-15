<template>
  <div class="editor">
    <Tabs type="card" v-model="currentIndex" addable>
      <TabPane v-for="(file,index) in openFiles" :key="'' + index" closable  :label="file.name" :name="'' + index">
        <MonacoEditor
          height="100%"
          language="typescript"
          srcPath="/static/monaco-editor/dev"
          :changeThrottle="1000"
          :code="file.content"
          @mounted="onMounted"
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
import _ from 'lodash'

export default{
  components: {
    MonacoEditor, Tabs, TabPane
  },
  mounted () {
    var $vue = this;

    $vue.$store.state.$eventBus.$on('file-open', (callback, params) => {
      $vue.setFile(params);
      $vue.currentFile = params;
      var currentFile = _.find($vue.openFiles, (file) => {
        return file.path === $vue.currentFile.path;
      });
      if (currentFile) {
        $vue.currentFile = currentFile;
      } else {
        $vue.currentFile = params;
        Vue.set($vue.openFiles, $vue.openFiles.length, params)
      }
    })
  },
  methods: {
    ...mapMutations(['setFile']),
    onMounted (editor) {}
  },
  computed: {
    currentIndex () {
      var $vue = this;
      // 晕死，必须返回字符串，才能正确切换
      return (_.findIndex($vue.openFiles, (file) => {
        return file.path === $vue.currentFile.path;
      })).toString()
    }
  },
  data () {
    return {
      editors: [],
      currentFile: Object,
      openFiles: []
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
