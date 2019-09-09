import Vue from 'vue';
// import Home from '@/modules/main/Home1.vue';
import Router from 'vue-router';
import { RouterFactory } from '@/utils/RouterScan/RouterFactory/RouterFactory';
import { DecVueRouterBuilder } from '@/utils/RouterScan/DecVueRouter/DecVueRouterBuilder';
import { IRouterBuilder } from '@/utils/RouterScan/RouterFactory/IRouterBuilder';
console.log('使用了use');
Vue.use(Router);
console.log('use结束');
function getRouter() {
    const builtrouter = new Router();

    const routerFactory = new RouterFactory(new DecVueRouterBuilder(true));
    const builder = routerFactory.getBuilder() as IRouterBuilder;
    builder.buildRouter();
    builder.addToRouter(builtrouter);
    return builtrouter;
}
const router: Router = getRouter();
export default router;
