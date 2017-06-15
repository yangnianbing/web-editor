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
        import 'element-ui/lib/theme-default/index.css'

        export default{
            name : 'app',
            components : {TopBar, ToolBar, Ide, ToolSlide},

            created(){
                var $eventBus = this.$store.state.$eventBus;
                var $vue = this;
                 window.addEventListener('keydown', e => {
                    if( e.ctrlKey  == true && e.keyCode == 83 ){
                        if($vue.$store.state.currentShowFile.type == 'tmp'){
                            $eventBus.$emit('saveFile');
                        }
                        e.preventDefault();
                    }
                })
            }
        }
</script>

<style lang="css">
    .ide{
        height: 100%;
    }
    
</style>