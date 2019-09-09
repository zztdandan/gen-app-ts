import axios from 'axios';
import { Axios4Ele, Axios4EleMethods } from './Axios4Ele';

class VueWrapInstall {
    // 固定的使用use安装到vue的写法
    public static install(Vue: any, options: object = {}): void {
        Vue.prototype.$defaultAxios = axios;
        Vue.prototype.$axios = Axios4EleMethods;
        // debugger;
        // methods.forEach(method => {
        //     Vue.prototype[`$$${method}XForm`] = axiosWrap[`${method}XForm`];
        //     Vue.prototype[`$$${method}Json`] = axiosWrap[`${method}Json`];
        // });
    }
}
export default VueWrapInstall;
