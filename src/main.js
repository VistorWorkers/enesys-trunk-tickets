import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import fastClick from 'fastclick'
import 'babel-polyfill'

import '@assets/styles/reset.css'

Vue.config.productionTip = false
fastClick.attach(document.body)

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next()
    } else {
        if (store.getters.isLogin) {
            next()
        } else {
            next('/')
        }
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')