import Vue from 'vue';
import Home from '@/modules/main/Home1.vue';
import VueRouter from 'vue-router';
import { RouterFactory } from '@/utils/RouterScan/RouterFactory/RouterFactory';
import { DecVueRouterBuilder } from '@/utils/RouterScan/DecVueRouter/DecVueRouterBuilder';
import { IRouterBuilder } from '@/utils/RouterScan/RouterFactory/IRouterBuilder';
function getRouter() {
    Vue.use(VueRouter);
    const builtrouter = new VueRouter();

    const routerFactory = new RouterFactory(new DecVueRouterBuilder(true));
    let builder = routerFactory.getBuilder() as IRouterBuilder;
    builder.buildRouter();
    builder.addToRouter(builtrouter);
    return builtrouter;
}

export default getRouter();
