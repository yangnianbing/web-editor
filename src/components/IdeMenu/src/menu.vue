<template>
  <div class="menu">
    <el-menu mode="horizontal">
      <template v-for="(menu, index) in menus">
        <template v-if="!menu.children">
          <el-menu-item index="index" @click="menuclick(menu.act)" :key="menu.act">{{menu.title}}</el-menu-item>    
        </template>
        <template v-if="menu.children">
          <el-sub-menu index="2">
            <template slot="title">{{menu.title}}</template>
            <el-menu-item index="2-1" v-for="child in menu.children" @click="menuclick(child.act)" :key="child.act">{{child.title}}</el-menu-item>
          </el-sub-menu>    
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {Menu, MenuItem, Submenu} from 'element-ui'

export default {
  name: 'IdeMenu',
  components: {
    ElMenu: Menu,
    ElMenuItem: MenuItem,
    ElSubMenu: Submenu
  },
  data () {
    return {
      menus: [{title: '文件', act: 'file'}],
      activeIndex: '1'
    }
  },
  beforeCreate () {
    this.$store.state.$eventBus.$emit('beforeCreate_menu', function () {}, {
      menu: this
    });
  },
  created () {
    var $vue = this;
    $vue.$store.state.$eventBus.$emit('created_menu', function (menus) {
      $vue.menus = menus;
    }, {
      menus: $vue.menus
    })
  },
  methods: {
    menuclick (act) {
      var $vue = this;
      this.$store.state.$eventBus.$emit(act, function () { }, {menu: $vue})
    }
  },
  beforeMount () {
    this.$store.state.$eventBus.$emit('beforeMount_menu', function () { })
  },
  mounted () {
    this.$store.state.$eventBus.$emit('mounted_menu', function () {})
  },
  beforeDestory () {
    console.log('beforeDestory')
  },
  destoryed () {
    console.log('destoryed');
  }
}
</script>

<style>
  .menu{
    height: 28px;
  }

  .menu .el-menu--horizontal .el-submenu .el-submenu__title{
    height: 28px;
    line-height: 28px;
  }

  .menu .el-menu--horizontal .el-submenu>.el-menu{
    top: 35px;
  }

  .menu .el-menu--horizontal{
    border-bottom: 0px;
  }
</style>
