<template>
  <div class="ide-left-tree ide-section">
    <Tree :data="treeData"></Tree>
  </div>
</template>

<script>
  import {Tree} from 'element-ui'
  export default{
    data () {
      return {
  
      }
    },
    computed: {
      treeData () {
        console.log(this.$store.state.files)
        return this.$store.state.files
      }
    },
    components: {
      Tree
    }
  }

</script>

<style lang="">
  .ide-left-tree{
    left: 0px;
    width: 20%;
    height: 100%;
  }

  .ide-left-tree ul.ide-left-tree-container{
    width:100%;
    height:100%;
    overflow: auto;
    padding-left: 0px;
  }
  
  .ide-left-tree ul{
    list-style: none;
  }
</style>
