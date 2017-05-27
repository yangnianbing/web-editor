<template>
    <div class="topBar">
        <ul class="menu">
            <li v-for="menuItem in menuItems">{{menuItem.name}}</li>
        </ul>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default{
        data(){
            return {
                
            }
        },
        computed : mapState({
            menuItems : state => state.menuItems
        })
    }

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