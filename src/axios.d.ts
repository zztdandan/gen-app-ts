import Vue from 'vue';
import { IAxoisWrapMethods } from './utils/AxiosWrap/IAxoisWrapMethods';
import { AxiosStatic } from 'axios';

declare module 'vue/types/vue' {
    interface Vue {
        $axios: IAxoisWrapMethods;
        $defaultAxios: AxiosStatic;
    }
}
