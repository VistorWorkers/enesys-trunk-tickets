<template>
    <div id="app">
        <transition :name="transitionName" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data(){
            return {
                transitionName: 'login'
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~@assets/styles/mixins.styl"
    @import "~@assets/styles/varibles.styl"
    #app
        fullPage()
        .login-enter-active
            transition: all .3s ease
            & /deep/ .header
                transition all .2s
            & /deep/ .main
                transition all .2s
        .login-enter
            opacity 0
            & /deep/ .header
                top - $headerHeight
            & /deep/ .main
                top 0
</style>
