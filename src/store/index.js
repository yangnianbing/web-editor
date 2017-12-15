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
    files: []
  },
  mutations: {
    setFiles (state, files) {
      state.files = _.keyBy(files, 'path');
    },
    setFile (state, file) {
      state.files[file.path] = file;
    }
  },
  actions: {},
  getters: {}
})

import FileAdd from '../plugin/file-add';
console.log(FileAdd);
console.log(new FileAdd().apply($eventBus));
