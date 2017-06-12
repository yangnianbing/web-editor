<template>
    <div class="breadcrumb">
        <ul>
            <li @click="changeCurrentOpenFile(index)" v-for="(path, index) in paths">
                <i  v-if="index != paths.length-1 || paths.length == 1" class="icon-close iconfont"></i>
                <i v-if="index == paths.length-1 && paths.length != 1" class="icon-form iconfont"></i>
                <span>{{path}}</span>
                <i  v-if="index != paths.length-1"  class="icon-more iconfont"></i>
            </li>
        </ul>
    </div>
</template>

<script>
    export default{

        computed : {
            paths(){
                return this.$store.state.currentShowFile.path ? this.$store.state.currentShowFile.path.split('/'):[this.$store.state.files.name];
            }
        },
        methods:{
            changeCurrentOpenFile(index){
                
            }
        }
    }
</script>

<style lang="css">
    div.breadcrumb ul{
        margin:0px;
        padding:0px;
    }

    .breadcrumb ul li{
        display: inline;
    }
</style>