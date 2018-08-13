<template>
    <div class="main">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'AppMain'
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~@assets/styles/varibles.styl"
    .main
        width 100%
        position absolute
        left 0
        right 0
        top $headerHeight
        bottom 0
</style>