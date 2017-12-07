import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)
const $eventBus = new Vue();
export default new Vuex.Store({
  state: {
  // get by store.state.x
  // mapState
    $eventBus: $eventBus,
    files: [],
    filesMap: {}
  },
  mutations: {
    setFiles (state, files) {
      state.files = files;
      state.filesMap = _.keyBy(files, 'path');
    },
    setFile (state, file) {
      // TODO update filesMap
      state.filesMap[file.path] = file;
      // state.files.forEach((item, index) => {
      //   if (item.path === file.path) {
      //     Vue.set(state.files, index, file);
      //   }
      // })
    }
  },
  actions: {},
  getters: {}
})

import FileAdd from '../plugin/file-add';
console.log(FileAdd);
console.log(new FileAdd().apply($eventBus));
