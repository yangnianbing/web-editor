<template>
  <Layout srcPath="/static/jquery/jquery-layout.js">
    <div class="ui-layout-center"></div>
    <div class="ui-layout-north"></div>
    <div class="ui-layout-south"><FileTree url="http://www.baidu.com"></FileTree></div>
    <div class="ui-layout-east"></div>
    <div class="ui-layout-west"></div>
  </Layout>
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

<style lang="css">
  .ide{
    height: 100%
  }
  
</style>
