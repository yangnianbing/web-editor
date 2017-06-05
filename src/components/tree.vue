<template>
    <li class="ide-left-tree-item">
    
        <div :class="{bold:isFolder}" @click="toggle" @dbclick="show">
            <i v-if="isFolder && !open" class="icon-arrow-close iconfont"></i>
            <i v-if="isFolder && open" class="icon-arrow-open iconfont"></i>
            <i v-if="isFolder && !open" class="icon-close iconfont"></i>
            <i v-if="isFolder && open" class="icon-open iconfont"></i>
            <i v-if="!isFolder" class="icon-form iconfont"></i>
            {{model.name}}    
        </div>
    
        <ul v-show="open" v-if="isFolder">
            <item class="item" v-for="child in model.children" :model="child"></item>
        </ul>
    </li>
</template>

<script>
    import Vue from 'vue'
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

        methods: {
            toggle: function() {
                if (this.model.isFolder) {
                    this.open = !this.open
                }else{
                    console.log(this.model);
                    //this.$store.commit('setCurrentShowFile', {currentShowFile})
                }
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