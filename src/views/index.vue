<template>
  <Layout>
    <div class="ui-layout-center"></div>
    <div class="ui-layout-north"></div>
    <div class="ui-layout-south"></div>
    <div class="ui-layout-east"></div>
    <div class="ui-layout-west"></div>
  </Layout>
</template>

<script>
  import '../assets/css/index.css'
  import 'element-ui/lib/theme-default/index.css'
  import Layout from '../components/layout'

  export default{
    name: 'app',
    components: {Layout},

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
