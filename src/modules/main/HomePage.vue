<template>
    <div>Welcome</div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { Route } from '../../utils/RouterScan/DecVueRouter/RouteDecorator';
@Route({
    name: 'home',
    label: '首页',
    manuallyUrl: '/',
})
@Component({})
export default class Home extends Vue {}
</script>

<style scoped>
</style>