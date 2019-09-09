<template>
    <div>
        <div>layout</div>
        <sidebar></sidebar>
        <section class>
            <router-view></router-view>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { Route } from '@/utils/RouterScan/DecVueRouter/RouteDecorator';
import sidebar from './sidebar/sidebar.vue';
@Route({
    name: 'layout',
    label: '首页框架',
    manuallyUrl: '/',
    redirect: '/index',
})
@Component({ name: 'Layout', components: { sidebar } })
export default class Layout extends Vue {}
</script>

<style  scoped>
.app-main {
    /* 50= navbar  50  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
}
</style>
