import axios from 'axios';
import { axiosMethods } from './AxiosWrapBase';

class VueWrapInstall {
    public static install(Vue: any, options: object = {}): void {
        Vue.prototype.$defaultAxios = axios;
        Vue.prototype.$axios = axiosMethods;
        // debugger;
        // methods.forEach(method => {
        //     Vue.prototype[`$$${method}XForm`] = axiosWrap[`${method}XForm`];
        //     Vue.prototype[`$$${method}Json`] = axiosWrap[`${method}Json`];
        // });
    }
}
export default VueWrapInstall;
