<template>
    <div class="login-page">
        <div class="container">
            <div class="col-xs-12 logo">
                <img src="@assets/images/login/login-logo.png"/>
            </div>
            <form class="col-xs-12 p-0">

            </form>
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
    </div>
</template>

<script>
    import store from '@store'
    import {login} from '@service'

    export default {
        name   : 'Login',
        data () {
            return {
                loginAccount  : '', // 账号
                password      : '', // 密码
                registrationID: '', // 极光推送id
                longitude     : '', // 经度
                latitude      : '', // 纬度
                serialNo      : '', // 设备序列号
                deviceModel   : '', // 设备型号
                deviceUUID    : ''  // 设备唯一标识
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
                    store.commit('SET_ISLOGIN', {staffName: "张三", staffId: "2018273625241"})
                    this.$router.push('/index')
                }).catch(function (res) {

                });

            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~@assets/styles/mixins.styl"
    .login-page
        background: url("~@assets/images/login/login.png") 0 0 no-repeat;
        background-size: cover;
        background-position: bottom;
        fullPage()
        .container
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            max-width 375px;
            height 250px;
            .logo
                transition transform .3s .5s;
                transform: translateY(0);
                img
                    height: auto;
                    width: 100%;
</style>