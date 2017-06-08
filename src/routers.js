const Home = resolve => {
    require.ensure(['./views/index.vue'], () => {
        resolve(require('./views/index.vue'));
    });
};

const layout = resolve => {
    require.ensure(['./views/layout.vue'], () => {
        resolve(require('./views/layout.vue'));
    });
};

const routers = [{
    path: '/',
    name: 'home',
    component: Home
}, {
    path : '/layout',
    name : 'layout',
    component : layout
}];

export default routers;