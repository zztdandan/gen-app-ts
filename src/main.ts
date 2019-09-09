import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import EleUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueWrapInstall from '@/utils/AxiosWrap/VueWrapInstall';

// tslint:disable-next-line:no-unused-expression
Vue.config.productionTip = false;
Vue.use(EleUI);
Vue.use(VueWrapInstall);
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
