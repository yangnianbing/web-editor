<template>
  <div class="ide">
    <Layout srcPath="/static/jquery/jquery-layout.js">
      <div class="ui-layout-center"></div>
      <div class="ui-layout-north"></div>
      <div class="ui-layout-south"></div>
      <div class="ui-layout-east"></div>
      <div class="ui-layout-west"><FileTree url="https://api.github.com/repos/yangnianbing/vue-web-ide/git/trees/master?recursive=1"></FileTree></div>
    </Layout>
  </div>
</template>

<script>
  import '../assets/css/index.css'
  import 'element-ui/lib/theme-default/index.css'
  import Layout from '../components/layout'
  import FileTree from '../components/FileTree'

  export default{
    name: 'app',
    components: {Layout, FileTree},

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
  .ide .ui-layout-pane{
    padding: 0px;
  }
  
</style>
