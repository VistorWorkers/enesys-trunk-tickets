<template>
    <div class="login-page">
        <div class="container">
            <div class="logo">
                <img src="@assets/images/login/login-logo.png"/>
            </div>
            <div class="loginPanel">
                <div class="input-group">
                    <span class="input-group-addon">
                        <i class="glyphicon glyphicon-user"></i>
                    </span>
                    <input type="text" v-model="request.loginAccount" placeholder="账号">
                </div>
                <div class="input-group m-t-20">
                    <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                    <input type="password" v-model="request.password" placeholder="密码">
                </div>
                <div class="login-buttons m-t-30">
                    <button type="button" class="col-md-12 btn btn-block login-button"
                            :class="loginBtn.class"
                            @click="handleLoginClick">
                        {{loginBtn.text}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '@store'
    import {login} from '@service'
    import {SET_ISLOGIN} from '@store/mutation-types.js'

    const BTN_LOGIN_WAIT = {
        text : '立即登入',
        class: ''
    };
    const BTN_LOGIN_NO_INPUT = {};
    const BTN_LOGIN_LOGNING = {};
    const BTN_LOGIN_SUCCESS = {};
    const BTN_LOGIN_OFF_LINE = {};
    const BTN_LOGIN_ERROR = {};

    export default {
        name   : 'Login',
        data () {
            return {
                request : {
                    loginAccount  : '', // 账号
                    password      : '', // 密码
                    registrationID: '', // 极光推送id
                    longitude     : '', // 经度
                    latitude      : '', // 纬度
                    serialNo      : '', // 设备序列号
                    deviceModel   : '', // 设备型号
                    deviceUUID    : ''  // 设备唯一标识
                },
                loginBtn: BTN_LOGIN_WAIT
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
                    store.commit(SET_ISLOGIN, {staffName: "张三", staffId: "2018273625241"})
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
        background url("~@assets/images/login/login.png") 0 0 no-repeat
        background-size cover
        background-position bottom
        fullPage()
        .container
            position absolute
            top 0
            bottom 0
            left 0
            right 0
            margin auto
            max-width 375px
            height 250px
            padding 0 40px
            .logo
                transition transform .3s .5s
                transform translateY(0)
                img
                    height auto
                    width 100%
            .loginPanel
                margin-top 30%
                .input-group
                    border #73736e 1px solid
                    background #73736e
                    box-shadow rgba(0, 0, 0, .5) 0 2px 7px inset
                    border-radius 5px
                    height 40px
                    margin-top 20px
                    &:first-child
                        margin 0
                    .input-group-addon
                        background transparent
                        border none
                        color #ffffff
                    input
                        width 100%
                        height 100%
                        padding-right 12px
                        background transparent
                        border none
                        color #ffffff
                .login-button
                    background linear-gradient(to bottom, rgba(253, 139, 0, 1) 0%, rgba(255, 85, 0, 1) 100%)
                    color #fff
                    font-size 16px
                    padding 7px
                    border none
                    border-radius 5px
                    margin-top 30px
                    &.login-success
                        background linear-gradient(to bottom, rgba(54, 148, 0, 1) 0%, rgba(47, 117, 0, 1) 100%)
                    &.login-danger
                        background linear-gradient(to bottom, rgba(166, 118, 23, 1) 0%, rgba(153, 81, 5, 1) 100%)
                    &.login-warning
                        background linear-gradient(to bottom, rgba(189, 66, 55, 1) 0%, rgba(158, 46, 33, 1) 100%)
</style>