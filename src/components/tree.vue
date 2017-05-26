<template>
    <li class="ide-left-tree-item">
    
        <div :class="{bold: isFolder}" @click="toggle" @dblclick="changeType">
            <i v-if="isFolder && open" class="icon-folder iconfont"></i>
            <i v-if="!isFolder" class="icon-form iconfont"></i>
            {{model.name}}    
        </div>
    
        <ul v-show="open" v-if="isFolder">
            <item class="item" v-for="model in model.children" :model="model"></item>
            <li class="add" @click="addChild">+</li>
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
                open: false
            }
        },
    
        computed: {
            isFolder: function() {
                return this.model.children &&
                    this.model.children.length
            }
        },
    
        methods: {
            toggle: function() {
                if (this.isFolder) {
                    this.open = !this.open
                }
            },
    
            changeType: function() {
    
                if (!this.isFolder) {
    
                    Vue.set(this.model, 'children', [])
    
                    this.addChild()
    
                    this.open = true
    
                }
    
            },
    
            addChild: function() {
    
                this.model.children.push({
    
                    name: 'new stuff'
    
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