import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('@pages/login/Login')
const Index = () => import('@pages/index/Index')

Vue.use(Router)

const routes = [{
    path: '/',
    name: 'Login',
    component: Login
}, {
    path: '/index',
    name: 'Index',
    component: Index
}];

export default new Router({
    routes,
    scrollBehavior (to, from, savedPosition) {
        return {x: 0, y: 0}
    }
})