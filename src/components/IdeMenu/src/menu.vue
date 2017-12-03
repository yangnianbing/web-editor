<template>
  <div class="menu">
    <el-menu mode="horizontal">
      <template v-for="(menu, index) in menus">
        <template v-if="!menu.children">
          <el-menu-item index="index">{{menu.title}}</el-menu-item>    
        </template>
        <template v-if="menu.children">
          <el-sub-menu index="2">
            <template slot="title">{{menu.title}}</template>
            <el-menu-item index="2-1" v-for="child in menu.children">{{child.title}}</el-menu-item>
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
      menus: [{
        title: '菜单1'
      }, {
        title: '菜单2',
        children: [{
          title: '菜单2-1'
        }, {
          title: '菜单2-3'
        }, {
          title: '菜单2-4'
        }]
      }],
      activeIndex: '1'
    }
  },
  beforeCreate () {
    this.state.$eventBus.$emit('beforeCreate_menu')
  },
  created () {
    console.log('created');
  },
  beforeMount () {
    console.log('before mount')
  },
  mounted () {
    console.log('mounted')
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

</style>
