import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'
import store from './store/index'
import $ from 'jquery'
import 'jquery-ui'
window.jQuery = $
window.$ = $
console.log($)
Vue.use(VueRouter)
Vue.config.debug = true
Vue.config.devtools = true

$.ajaxSettings.crossDomain = true

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

