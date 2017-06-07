const Home = resolve => {
    require.ensure(['./views/layout.vue'], () => {
        resolve(require('./views/layout.vue'));
    });
};

const routers = [{
    path: '/',
    name: 'home',
    component: Home
}];

export default routers;