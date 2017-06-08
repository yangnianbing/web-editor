<template>
    <div class="ide">
        <TopBar></TopBar>
        <ToolBar></ToolBar>
        <Ide></Ide>
        <ToolSlide></ToolSlide>
    </div>
</template>

<script>
        import TopBar from '../components/topBar'
        import ToolBar from '../components/toolBar'
        import Ide from '../components/ide'
        import ToolSlide from '../components/toolSlide'
        import '../assets/css/index.css'

        export default{
            name : 'app',
            components : {TopBar, ToolBar, Ide, ToolSlide}
        }
</script>

<style lang="css">
    ul{
        list-style: none;
    }
    ul li{
        display : inline;
    }
    
</style>