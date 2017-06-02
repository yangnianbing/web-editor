<template>
    <div class="ide-left-tree ide-section">
        <ul class="ide-left-tree-container">
            <item class="item" :model="treeData"></item>
        </ul>
    </div>
</template>

<script>
    import item from './tree' 
    export default{
        data(){
            return {
                treeData : data
            }
        },
        components:{
            item
        }
    }   

var data = {
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'wat' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        },
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        }
      ]
    }
  ]
}

</script>

<style lang="">
    .ide-left-tree{
      left:0px;
      width:20%;
      height:100%;
    }

    .ide-left-tree ul.ide-left-tree-container{
      width:100%;
      height:100%;
      overflow : auto;
    }
</style>