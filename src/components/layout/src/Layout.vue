<template>
  <div class="vue-jquery-layout" style="zoom: 1; overflow: hidden; width: auto; height: auto; margin: 0px; position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px;">
    <slot></slot>
  </div>
</template>

<script>
import loader from './LayoutLoader'
import $ from 'jquery'

export default {
  props: {
    srcPath: String
  },
  mounted () {
    this.fetchJqueryLayout()
  },
  methods: {
    initLayout () {
      $(this.$el).layout()
    },
    fetchJqueryLayout () {
      loader.load(this.srcPath, this.initLayout)
    }
  }
}
</script>

<style>

</style>
