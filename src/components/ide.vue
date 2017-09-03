<template>
  <div class="ide-main-content">
  <div class="ide-main-section">
    <IdeLeftTree></IdeLeftTree>
    <IdeRightContent></IdeRightContent>
  </div>
  </div>
</template>

<script>
  import IdeLeftTree from './ideLeftTree'
  import IdeRightContent from './ideRightContent'
  export default{
    components: {
      IdeLeftTree,
  
      IdeRightContent
    }
  }
</script>

<style lang="css">
  .ide-main-content{
    /*bottom: 52px
    top: 50px
    left: 26px
    right: 26px*/
    bottom: 0px;
    top: 50px;
    left: 0px;
    right: 0px;
    position: absolute;
    z-index: 1
  }

  .ide-section{
    position:absolute;
  }

  .ide-main-section{
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }

  .ide-main-section.up{
    height:70%;
  }
  
  .ide-main-section.down{
    height:30%;
    top:70%;
  }
</style>
