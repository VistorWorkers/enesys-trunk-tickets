<template>
    <div class="page">
        <app-header>
            <router-link to="/index" tag="a" class="logo">
                <img src="@assets/images/index/logo.png" height="25">
            </router-link>
            <button type="button" class="navbar-toggle loginOut">
                <img src="@assets/images/index/loginOut.png" width="26">
            </button>
        </app-header>
        <app-main>

        </app-main>
    </div>
</template>

<script>
    import AppHeader from '@common/header/Header'
    import AppMain from '@common/main/Main'
    export default {
        name      : 'Index',
        data(){
            return {}
        },
        components: {
            AppHeader,
            AppMain
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~@assets/styles/mixins.styl"
    .page
        fullPage()
        .logo
            float left
        & /deep/ .main
            background url('~@assets/images/index/index.png') 0 0 no-repeat
            background-size cover
            background-position bottom
        .loginOut
            border none
            margin 0
            padding 0
</style>