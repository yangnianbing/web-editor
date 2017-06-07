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
        import {GridItem, GridLayout} from 'vue-grid-layout'
        import '../assets/css/index.css'

        console.log(GridItem, GridLayout)
        export default{
            name : 'app',
            components : {TopBar, ToolBar, Ide, ToolSlide, GridLayout, GridItem}
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