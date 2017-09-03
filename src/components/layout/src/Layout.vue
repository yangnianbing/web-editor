<template>
  <div class="vue-jquery-layout">

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
    fetchJqueryLayout () {
      loader.load(this.srcPath, function () {
        console.log($.layout)
      })
    }
  }
}
</script>

<style>

</style>
