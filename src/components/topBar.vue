<template>
  <div class="topBar">
  <el-menu theme="light" class="el-menu-demo" mode="horizontal" >
    <template v-for="(menuItem, index) in menuItems">
    <el-menu-item v-if="!menuItem.items" index="index">{{menuItem.name}}</el-menu-item>
    <el-submenu v-if="menuItem.items" index="index">
      <template slot="title">{{menuItem.name}}</template>
       <el-menu-item v-for="(subMenuItem, subIndex) in menuItem.items" :key="subIndex" @click="executeCommander(subMenuItem.commander)" index="index + '-'  + subIndex">
      {{subMenuItem.name}}
       </el-menu-item>
    </el-submenu>
    </template>
  </el-menu>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {Menu, Submenu, MenuItem} from 'element-ui'
  import commander from '../commander/index'

  export default{
    data () {
      return {
  
      }
    },
    computed: mapState({
      menuItems: state => state.menuItems
    }),
    methods: {
      executeCommander (commander) {
        this[commander]()
      }
    },
    created () {
      var $eventBus = this.$store.state.$eventBus
      $eventBus.$on('saveFile', () => {
        this['saveFile']()
      })
      $eventBus.$on('createFile', (...param) => {
        this['createFile']()
      })
    },
    mixins: [commander],
    components: {
      ElMenu: Menu,
      ElSubmenu: Submenu,
      ElMenuItem: MenuItem
    }
  }
</script>

<style lang="css">
  .theme-dark .menu{
    background: #e5e5e5;
  }

  .topBar .el-menu--horizontal .el-submenu .el-submenu__title {
    height: 25px;
    line-height: 25px;
  }

  .topBar .el-menu--horizontal .el-menu-item {
    height: 25px;
    line-height: 25px;
  }

  .topBar .el-menu--horizontal .el-submenu>.el-menu{
    top : 30px;
  }

  .topBar  .el-menu--horizontal>.el-submenu:hover .el-submenu__title{
    border-bottom-color : transparent;
  }

  .topBar .el-menu--horizontal>.el-menu-item:hover{
    border-bottom-color : transparent;
  }
  .topBar .el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
    border-bottom-color : transparent;
  }
</style>
