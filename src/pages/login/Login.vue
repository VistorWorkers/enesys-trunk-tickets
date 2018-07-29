<template>
    <div>
        <div>this is a login page</div>
        <button @click="handleLoginClick">登录</button>
    </div>
</template>

<script>
    import store from '@store'

    export default {
        name: 'Login',
        data () {
            return {}
        },
        methods: {
            handleLoginClick () {
                store.commit('SET_ISLOGIN', {staffName: "张三", staffId: "2018273625241"})
                this.$router.push('/index')
            }
        }
    }
</script>

<style scoped>

</style>