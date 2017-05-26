<template>
    <div class="toolBar">
        <breadcrumb></breadcrumb>
        <div class="toolbar-command">
        </div>
    </div>
</template>

<script>
    import breadcrumb from './breadcrumb'
    export default{
        computed : {
            path(){
                return this.$store.state.currentOpenFile;
            }
        },
        components:{
            breadcrumb
        }
    }
</script>

<style lang="css">
    .toolBar {
        border-top: 1px solid transparent;
        border-bottom: 2px solid transparent;
    }
</style>