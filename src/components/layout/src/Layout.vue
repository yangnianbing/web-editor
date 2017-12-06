<template>
  <div class="vue-jquery-layout" style="zoom: 1; overflow: hidden; width: auto; height: auto; margin: 0px; position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px;">
    <slot></slot>
  </div>
</template>

<script>
/* eslint-disable */
import loader from './LayoutLoader'

export default {
  props: {
    srcPath: String,
    resizable: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: true
    },
    slidable: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    this.fetchJqueryLayout()
  },
  methods: {
    initLayout () {
      window.$(this.$el).layout({
        closable: true,
        resizable: true,
        slidable:	true,
        livePaneResizing: true,
        spacing_open: 2,
        togglerLength_open: 2,
        north__resizable: false,
        //stateManagement__enabled:	true, // automatic cookie load & save enabled by default
        showDebugMessages: true // log and/or display messages from debugging & testing code
      })
    },
    fetchJqueryLayout () {
      loader.load(this.srcPath, this.initLayout)
    }
  }
}
</script>

<style>

</style>
