<template>
    <div>真首页</div>
</template>
<script lang='ts'>
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { Route } from '@/utils/RouterScan/DecVueRouter/RouteDecorator';
@Route({
    name: 'home',
    label: '真首页',
    manuallyUrl: 'index',
    parentRoute: 'layout',
})
@Component({})
export default class Home extends Vue {}
</script>
<style scoped>
</style>