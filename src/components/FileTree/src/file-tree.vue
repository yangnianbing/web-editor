<template>
  <Tree></Tree>
</template>

<script>
import {Tree} from 'element-ui';
import axios from 'axios';

export default {
  name: 'FileTree',
  props: {
    url: String,
    localData: Object
  },
  components: {
    Tree
  },
  data () {
    return {
      data: []
    }
  },
  mounted () {
    if (this.localData) {
      this.data = this.localData
    } else if (this.url) {
      axios.get(this.url).then(function (resp) {
        debugger
        console.log(resp)
      })
    }
  }
}
</script>

<style>

</style>
