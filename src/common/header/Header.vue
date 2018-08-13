<template>
    <div class="header">
        <slot></slot>
        <!--<div class="pull-left">-->
            <!--<slot name="left"></slot>-->
        <!--</div>-->
        <!--<div class="page-title">-->
            <!--<slot name="middle" class="page-title"></slot>-->
        <!--</div>-->
        <!--<div class="pull-right">-->
            <!--<slot name="right"></slot>-->
        <!--</div>-->

    </div>
</template>

<script>
    export default {
        name: 'AppHeader'
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~@assets/styles/mixins.styl"
    @import "~@assets/styles/varibles.styl"
    .header
        background $headerBgColor
        box-shadow 0 0 2px rgba(0, 0, 0, 0.3)
        color $headerColor
        height $headerHeight
        width 100%
        position fixed
        padding 10px
        overflow hidden
        left 0
        right 0
        top 0
        z-index $navigationZindex
        .page-title
            display flex
            align-items center
            justify-content center
            position absolute
            left 0
            right 0
            top 10px
            bottom 10px
            margin 0 auto
            font-size $headerFontSize
            max-width 60%
            span
                ellipsis()
</style>