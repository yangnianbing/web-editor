
import $ from 'webpack-zepto';
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routers';
import store from './store/index'

Vue.use(VueRouter);

$.ajaxSettings.crossDomain = true;

// 实例化VueRouter
const router = new VueRouter({
    mode: 'hash',
    routes
});



new Vue({
    router,
    store
}).$mount('#app');
