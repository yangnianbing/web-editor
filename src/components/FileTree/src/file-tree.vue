<template>
  <div class="file-tree">
    <Tree :data="data" @node-click="nodeClick"></Tree>
  </div>
</template>

<script>
import {Tree} from 'element-ui';
import constants from '../../../constants/constants'
import _ from 'lodash'
import api from '../../../api'
import Vue from 'vue'

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
  methods: {
    refresh (data) {
      var $vue = this;
      if (typeof data === 'object') {
        $vue.data = toTree(this.localData.tree);
      } else if (typeof data === 'string') {
        api('get', data, {}, (resp) => {
          var data = resp.data;
          var tree = data.tree;
          Vue.set($vue, 'data', toTree(tree))
        }, (error) => {
          console.log(error, 11111)
        })
      }

      function toTree (subNodes) {
        var treeNodes = {};
        var rootNodes = [];
        subNodes.forEach(function (node) {
          var path = node.path;
          var lastSeperateIndex = path.lastIndexOf(constants.FILE_SEPERATE);
          node.label = path.substring(lastSeperateIndex + 1);
          if (lastSeperateIndex !== -1) {
            var parentPath = path.substring(0, lastSeperateIndex);
            var parentNode = treeNodes[parentPath];
            if (!parentNode) {
              treeNodes[parentPath] = {};
              treeNodes[parentPath].children = [node];
            } else {
              !parentNode.children && (parentNode.children = []);
              parentNode.children.push(node);
            }
          } else {
            rootNodes.push(path);
          }
          var currentNode = treeNodes[path];
          if (currentNode) {
            Object.assign(currentNode, node);
          } else {
            treeNodes[path] = node;
          }
        })
        var files = rootNodes.map(node => treeNodes[node]);
        var dirs = _.remove(files, node => {
          return node.type === 'tree';
        })
        dirs.sort((arg1, arg2) => {
          return arg1.label > arg2.label ? 1 : -1;
        })
        files.sort((arg1, arg2) => {
          return arg1.label > arg2.label ? 1 : -1;
        })
        return dirs.concat(files);
      }
    },
    nodeExpand (data, node, $el) {
      var children = data.children;
      var fileHaveNotLoadArray = _.filter(children, (node) => node.type === 'blob' && !node.content);
      fileHaveNotLoadArray.forEach(fileHaveNotLoad => {
        api('get', fileHaveNotLoad.url, {}, resp => {
          var data = resp.data;
          console.log(data.content);
          fileHaveNotLoad.content = atob(data.content);
        }, error => {
          console.log(error);
        })
      })
    },
    nodeClick (data, node, $el) {
      if (data.type === 'blob' && !data.content) {
        api('get', data.url, {}, resp => {
          var content = atob(resp.data);
          console.log(content);
        })
      }
    }
  },
  mounted () {
    var $vue = this;
    $vue.refresh($vue.localData ? $vue.localData : $vue.url);

    this.$store.state.$eventBus.$on('open-url', (callback, param) => {
      $vue.refresh(param.url)
    });
  }
}
</script>

<style>
  .file-tree .el-tree{
    border : 0px;
  }
</style>
