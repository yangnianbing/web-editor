
import $ from 'webpack-zepto';
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routers';
import store from './store/index'

Vue.use(VueRouter);
Vue.config.debug = true;
Vue.config.devtools = true;

$.ajaxSettings.crossDomain = true;

// 实例化VueRouter
const router = new VueRouter({
    mode: 'history',
    routes
});



new Vue({
    router,
    store
}).$mount('#app');
