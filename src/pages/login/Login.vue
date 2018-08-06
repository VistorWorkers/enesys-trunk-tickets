<template>
    <div>
        <div>this is a login page</div>
        <div>
            账号
            <input type="text" name="loginAccount" v-model="loginAccount">
        </div>
        <div>
            密码
            <input type="password" name="password" v-model="password">
        </div>
        <button @click="handleLoginClick">登录</button>
    </div>
</template>

<script>
    import store from '@store'
    import {login} from '@service'

    export default {
        name   : 'Login',
        data () {
            return {
                loginAccount: '',
                password    : ''
            }
        },
        methods: {
            handleLoginClick () {
                let loginAccount = this.loginAccount
                let password = this.password

                login({
                    loginAccount,
                    password
                }).then(function ({data}) {

                }).catch(function (res) {

                });
//                store.commit('SET_ISLOGIN', {staffName: "张三", staffId: "2018273625241"})
//                this.$router.push('/index')
            }
        }
    }
</script>

<style scoped>

</style>