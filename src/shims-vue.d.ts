import { IAxoisWrapMethods } from '@/utils/axioswrap/IAxoisWrapMethods';
import Vue from 'vue';
declare module '*.vue' {
    export default Vue;
}

declare module 'element-ui/lib/locale/lang/*' {
    export const elementLocale: any;
}

declare module '*.gif' {
    export const gif: any;
}

//如果需要挂载一些东西在vue的$上面需要在这里注册
declare module 'vue/types/vue' {
    interface Vue {
        // $axios:IAxoisWrapMethods
    }
}
// TODO: remove this part after vue-count-to has its typescript file
declare module 'vue-count-to';

// TODO: remove this part after vuedraggable has its typescript file
declare module 'vuedraggable';

// TODO: remove this part after vue2-dropzone has its typescript file
declare module 'vue2-dropzone';

// TODO: remove this part after vue-image-crop-upload has its typescript file
declare module 'vue-image-crop-upload';

// TODO: remove this part after vue-splitpane has its typescript file
declare module 'vue-splitpane';
