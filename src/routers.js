const Home = resolve => {
    require.ensure(['./views/index.vue'], () => {
        resolve(require('./views/index.vue'));
    });
};

const routers = [{
    path: '/',
    name: 'home',
    component: Home
}];

export default routers;