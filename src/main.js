import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'
import store from './store/index'

Vue.use(VueRouter)
Vue.config.debug = true
Vue.config.devtools = true

window.$.ajaxSettings.crossDomain = true

// 实例化VueRouter
const router = new VueRouter({
  mode: 'history',
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store
})

