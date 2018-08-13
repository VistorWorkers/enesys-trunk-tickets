<template>

    <div class="login-page" :class="loginPageClass">
        <div class="switchButton">
            <i class="fa"
               :class="icon"
               @click="handlePanelTypeChange"></i>
        </div>
        <div class="container">
            <div class="logo">
                <img src="@assets/images/login/login-logo.png"/>
            </div>
            <div class="loginPanel" v-if="panelType==='login'">
                <div class="input-group">
                    <span class="input-group-addon">
                        <i class="glyphicon glyphicon-user"></i>
                    </span>
                    <input type="text" name="loginAccount" placeholder="账号"
                           v-model="request.loginAccount"
                           :key="'loginAccount'"
                           @keyup.enter="handleLogin">
                </div>
                <div class="input-group m-t-20">

                    <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                    <input type="password" name="password" placeholder="密码"
                           v-model="request.password"
                           :key="'password'"
                           @keyup.enter="handleLogin">
                </div>
                <div class="login-buttons m-t-30">
                    <button type="button" class="col-md-12 btn btn-block login-button"
                            :class="loginBtn.class"
                            @click="handleLogin">
                        {{loginBtn.text}}
                    </button>
                </div>
            </div>
            <div class="loginPanel" v-if="panelType==='setting'">
                <div class="input-group">
                    <span class="input-group-addon">
                        请求地址
                    </span>
                    <input type="text" name="serverURL" placeholder="http://ip:port"
                           v-model="setting.serverURL"
                           :key="'serverURL'"
                           @keyup.enter="handleSetting">
                </div>
                <div class="input-group m-t-20">

                    <span class="input-group-addon">
                        附件地址
                    </span>
                    <input type="text" name="attachmentsURL" placeholder="http://ip:port"
                           v-model="setting.attachmentsURL"
                           :key="'attachmentsURL'"
                           @keyup.enter="handleSetting">
                </div>
                <div class="login-buttons m-t-30">
                    <button type="button" class="col-md-12 btn btn-block login-button"
                            :class="settingBtn.class"
                            @click="handleSetting">
                        {{settingBtn.text}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '@store'
    import {login, ERR_SUCCESS} from '@service'
    import {SET_ISLOGIN} from '@store/mutation-types.js'
    import {OUTLINE_LOGIN_TIME, IN_APK} from '@config/config.js'
    import {hex_md5} from '@utils/md5.js'

    const BTN_LOGIN_WAIT = {
        text : '立即登入',
        class: ''
    }
    const BTN_LOGIN_NO_INPUT = {
        text : '请输入账号密码',
        class: 'login-warning'
    }
    const BTN_LOGIN_LOGNING = {
        text : '登录中...',
        class: ''
    }
    const BTN_LOGIN_SUCCESS = {
        text : '登陆成功，页面跳转中...',
        class: 'login-success'
    }
    const BTN_LOGIN_OFF_LINE_SUCCESS = {
        text : '离线验证成功，加载中...',
        class: 'login-danger'
    }
    const BTN_LOGIN_OFF_LINE_ERROR = {
        text : '离线验证失败！',
        class: 'login-warning'
    }
    const BTN_LOGIN_ERROR = {
        text : '',
        class: 'login-warning'
    }

    const BTN_SETTING_WAIT = {
        text : '保存',
        class: ''
    }
    const BTN_SETTING_SUCCESS = {
        text : '保存成功',
        class: 'login-success'
    }
    const BTN_SETTING_ERROR = {
        text : '请输入请求地址',
        class: 'login-warning'
    }

    export default {
        name    : 'Login',
        data () {
            return {
                request       : {
                    loginAccount  : '', // 账号
                    password      : '', // 密码
                    registrationID: '', // 极光推送id
                    longitude     : '', // 经度
                    latitude      : '', // 纬度
                    serialNo      : '', // 设备序列号
                    deviceModel   : '', // 设备型号
                    deviceUUID    : ''  // 设备唯一标识
                },
                setting       : {
                    serverURL     : '',
                    attachmentsURL: ''
                },
                loginBtn      : BTN_LOGIN_WAIT,
                settingBtn    : BTN_SETTING_WAIT,
                panelType     : 'login',
                loginPageClass: ''
            }
        },
        created(){
            // 获取最后一次登录的用户信息
            let csrInfo = JSON.parse(localStorage.getItem('csrInfo') || '{}')

            // 设置最后一次登录的 账号
            this.request.loginAccount = csrInfo.loginAccount ? csrInfo.loginAccount : ''

            this.setting.serverURL = localStorage.getItem('serverURL')
            this.setting.attachmentsURL = localStorage.getItem('serverURL') || this.setting.serverURL

            // 判断是否在apk内
            if (IN_APK) {
                this.request.registrationID = localStorage.getItem("registrationID")
                this.request.deviceModel = window.device.serialNo
                this.request.serialNo = window.device.serialNo
                this.request.deviceUUID = window.device.deviceUUID
                // todo 需添加获取经纬度方法
            }
        },
        computed: {
            icon(){
                return this.panelType === 'login' ? 'fa-gear' : 'fa-user'
            }
        },
        methods : {
            router2Index(){
                this.$router.push('/index')
            },
            outlineLogin(){
                let validateStr = hex_md5(`${this.request.loginAccount}_${this.request.password}`)
                let time = new Date().getTime()
                let csrName = hex_md5(this.request.loginAccount)
                let validateRef = JSON.parse(localStorage.getItem(csrName) || '{}')
                // 获取到离线登录数据 并且在时效内 并且 密码正确
                if (time < validateRef.time + OUTLINE_LOGIN_TIME && validateRef.validateStr === validateStr) {
                    store.commit(SET_ISLOGIN, {
                        loginInfo: {
                            deptName    : validateRef.deptName,
                            staffName   : validateRef.staffName,
                            loginAccount: this.request.loginAccount,
                            staffId     : validateRef.staffId
                        }
                    })
                    this.loginBtn = BTN_LOGIN_OFF_LINE_SUCCESS
                    this.router2Index()
                } else {
                    this.loginBtn = BTN_LOGIN_OFF_LINE_ERROR
                }
            },
            handleLogin () {
                let loginAccount = this.request.loginAccount
                let password = this.request.password

                if (loginAccount && password) {
                    this.loginBtn = BTN_LOGIN_LOGNING

                    login(this.request).then(({data}) => {
                        if (data.returnCode === ERR_SUCCESS) {
                            let loginInfo = data.data
                            this.loginBtn = BTN_LOGIN_SUCCESS
                            store.commit(SET_ISLOGIN, {loginInfo, loginData: this.request})
                            this.router2Index()
                        } else {
                            this.loginBtn = BTN_LOGIN_ERROR
                            this.loginBtn.text = data.returnMessage
                        }
                    }).catch(() => {
                        this.outlineLogin()
                    });
                } else {
                    this.loginBtn = BTN_LOGIN_NO_INPUT;
                }
            },
            handlePanelTypeChange(){
                this.panelType = this.panelType === 'login' ? 'setting' : 'login'
            },
            handleSetting(){
                let serverURL = this.setting.serverURL
                let attachmentsURL = this.setting.attachmentsURL || serverURL
                if (serverURL) {
                    localStorage.setItem('serverURL', serverURL)
                    localStorage.setItem('attachmentsURL', attachmentsURL)
                    this.settingBtn = BTN_SETTING_SUCCESS
                    // 刷新页面
                    location.reload()
                }
                else {
                    this.settingBtn = BTN_SETTING_ERROR
                }
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~@assets/styles/mixins.styl"
    @import "~@assets/styles/varibles.styl"
    .login-page
        background-color #3c3732
        background url("~@assets/images/login/login.png") 0 0 no-repeat
        background-size cover
        background-position bottom
        transition all .3s linear
        fullPage()
        .switchButton
            position: absolute
            right 5px
            top 5px
            padding 5px
            .fa
                opacity .3
                font-size 2rem
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
                        font-size 1.4rem
                        font-family $fontFamily
                        &::-webkit-input-placeholder {
                            color: #c9caca;
                        }
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