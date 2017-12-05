<template>
  <div class="ide">
    
      <div class="ui-layout-center"></div>
      <div class="ui-layout-north"><IdeMenu></IdeMenu></div>
      <div class="ui-layout-south"></div>
      <div class="ui-layout-east"></div>
      <div class="ui-layout-west"><FileTree :localData="mockData" :url="url"></FileTree></div>
    
  </div>
</template>

<script>
  import '../assets/css/index.css'
  import 'element-ui/lib/theme-chalk/index.css'
  import Layout from '../components/layout'
  import FileTree from '../components/FileTree'
  import IdeMenu from '../components/IdeMenu'
  import mockData from './mock'

  export default{
    name: 'app',
    components: {Layout, FileTree, IdeMenu},
    data () {
      return {
        mockData: mockData,
        url: 'https://api.github.com/repos/yangnianbing/vue-web-ide/git/trees/master?recursive=1'
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
  .ui-layout-west{
    width: 20%;
    position: absolute;
    top: 61px;
    bottom: 0px;
  }
</style>
