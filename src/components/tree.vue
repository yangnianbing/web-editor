<template>
    <li class="ide-left-tree-item">
    
        <div :class="{bold:isFolder}" @click="toggle" @dbclick="show">
            <i v-if="isFolder && !open" class="icon-arrow-close iconfont"></i>
            <i v-if="isFolder && open" class="icon-arrow-open iconfont"></i>
            <i v-if="isFolder && !open" class="icon-close iconfont"></i>
            <i v-if="isFolder && open" class="icon-open iconfont"></i>
            <i v-if="!isFolder" class="icon-form iconfont"></i>
            {{modelWithPath.name}}    
        </div>
    
        <ul v-show="open" v-if="isFolder">
            <item class="item" v-for="child in modelWithPath.children" :model="child"></item>
        </ul>
    </li>
</template>

<script>
    import Vue from 'vue'
    import idGenerator from '../comet/idGenerator'

    export default {  
        name: 'item',
        props: {
            model: Object
        },
        data: function() {
            return {
                isFolder : this.model.isFolder,
                open: false
            }
        },
        computed : {
            modelWithPath : function(){
                var $vue = this;
                $vue.model.isFolder &&  $vue.model.children.forEach(function(child){
                    child.path =  $vue.model.path ? ( $vue.model.path + '/' + child.name) : ( $vue.model.name + '/' + child.name) ;
                    child.id = idGenerator.next();
                })
                return $vue.model;
            }
        },
        methods: {
            toggle: function() {
                if (this.model.isFolder) {
                    this.open = !this.open
                }else{
                    this.$store.commit('setCurrentShowFile', {currentShowFile:this.model})
                }
                this.$store.commit('setCurrentSelectFile', {currentSelectFile:this.model})
            },
            show : function(){

            },
            addChild: function() {
                this.model.children.push({
                    name: ''
                })
            }
        }
    }
</script>

<style lang="css">
    .ide-left-tree-item .item {
        cursor: pointer;
    }
    
    .ide-left-tree-item .bold {
        font-weight: bold;
    }
    
    .ide-left-tree-item ul { 
        padding-left: 1em;
        line-height: 1.5em; 
        list-style-type: dot;
    }
</style>