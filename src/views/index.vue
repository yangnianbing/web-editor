<template>
  <div class="ide">
    <Layout>
      <div class="ui-panel ui-layout-center"><Editor></Editor></div>
      <div class="ui-panel ui-layout-south"></div>
      <div class="ui-panel ui-layout-east"></div>
      <div class="ui-panel ui-layout-west"><FileTree :localData="mockData" :url="url"></FileTree></div>
      <div class="ui-panel ui-layout-north"><IdeMenu></IdeMenu></div>
    </Layout>
  </div>
</template>

<script>
  import '../assets/css/index.css'
  import 'element-ui/lib/theme-chalk/index.css'
  import FileTree from '../components/FileTree'
  import IdeMenu from '../components/IdeMenu'
  import Editor from '../components/Editor'
  import Layout from '../components/layout'

  import mockData from './mock'

  export default{
    name: 'app',
    components: {Layout, FileTree, IdeMenu, Editor},
    data () {
      return {
        mockData: mockData,
        url: ''
      }
    },
    created () {
      var $eventBus = this.$store.state.$eventBus
      var $vue = this
      window.addEventListener('keydown', e => {
        if (e.ctrlKey === true && e.keyCode === 83) {
          if ($vue.$store.state.currentShowFile.type === 'tmp') {
            $eventBus.$emit('saveFile')
          }
          e.preventDefault()
        }
      })
    }
  }
</script>

<style>
  .ide{
    height: 100%;
  }
  .ui-layout-north.ui-layout-pane{
    overflow: visible;
  }

  .ui-panel.ui-layout-pane{
    padding: 0px
  }

</style>
