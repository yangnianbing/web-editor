<template>
    <div class="topBar">
        <ul class="menu">
            <li v-for="menuItem in menuItems">{{menuItem.name}}</li>
        </ul>
    </div>
</template>
<script>
    export default{
        
        data(){
            return {
                menuItems : menuItems
            }
        }
    }

    var menuItems = [{
        name : 'File',
        items : [
            {
                name : 'New File'
            }, {
                name : 'New Folder'
            },{
                name : 'Save'
            }
        ]
    }]
</script>

<style lang="css">
    .theme-dark .menu{
        background: #e5e5e5;
    }
    .topBar ul.menu{
        height : 25px;
        margin:0px;
        line-height:25px;
    }
</style>