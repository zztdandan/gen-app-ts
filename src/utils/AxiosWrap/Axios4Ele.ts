import { AxiosWrapBase } from './AxiosWrapBase';
import { Loading, MessageBox, Notification, Message } from 'element-ui';

import { IAxoisWrapMethods } from './IAxoisWrapMethods';

import { AxiosResponse } from 'axios';
import { Route } from '../RouterScan/DecVueROuter/RouteDecorator';

interface IOtherOption {
    element: boolean;
    loading: boolean;
    fullscreen: boolean;
    successMsg?: string;
}
export class Axios4Ele extends AxiosWrapBase {
    public static initAxios(): IAxoisWrapMethods {
        const wrap = new Axios4Ele();
        return {
            get: (url: string, data: object) => wrap.CommenAjax('get', 'application/x-www-form-urlencoded', url, data),
            post: (url: string, data: object) =>
                wrap.CommenAjax('post', 'application/x-www-form-urlencoded', url, data),
            postJson: (url: string, data: object) => wrap.CommenAjax('post', 'application/json', url, data),
            postForm: (url: string, data: object) => wrap.CommenAjax('post', 'multipart/form-data', url, data),
            put: (url: string, data: object) => wrap.CommenAjax('put', 'application/x-www-form-urlencoded', url, data),
            putJson: (url: string, data: object) => wrap.CommenAjax('put', 'application/json', url, data),
            putForm: (url: string, data: object) => wrap.CommenAjax('put', 'multipart/form-data', url, data),
            patch: (url: string, data: object) =>
                wrap.CommenAjax('patch', 'application/x-www-form-urlencoded', url, data),
            patchForm: (url: string, data: object) => wrap.CommenAjax('patch', 'multipart/form-data', url, data),
            patchJson: (url: string, data: object) => wrap.CommenAjax('patch', 'application/json', url, data),
            delete: (url: string, data: object) =>
                wrap.CommenAjax('delete', 'application/x-www-form-urlencoded', url, data),
            deleteForm: (url: string, data: object) => wrap.CommenAjax('delete', 'multipart/form-data', url, data),
            deleteJson: (url: string, data: object) => wrap.CommenAjax('delete', 'application/json', url, data),
        };
    }

    private loadinginstace: any;
    // tslint:disable-next-line:no-empty
    constructor() {
        super();
    }

    /**
     * 公用ajax方法。在4Ele中，相关回馈增加了element的内容
     * @param method get\post
     * @param dataType 传输的数据类型
     * @param url 地址
     * @param data 传输数据
     * @param params 参数
     * @param options 选项
     * @param otherOptions 其他选项
     */
    // tslint:disable-next-line:max-line-length
    public async CommenAjax(
        method: string,
        dataType: string,
        url: string,
        data: object = {},
        params: object = {},
        options: object = {},
        otherOptions: IOtherOption = { element: true, loading: false, fullscreen: false },
    ): Promise<object> {
        try {
            if (otherOptions.loading) {
                this.openLoading(otherOptions.fullscreen);
            }
            const response1: AxiosResponse = await this.service({
                ...options,
                url: this.changeUrl(url),
                data: this.dataConvert(data, dataType),
                params: method === 'get' ? data : params,
                headers: {
                    'Content-Type': dataType,
                    // [TokenKey]: getToken() || "",
                },
            });
            const resdata = this.checkResponse(response1);
            if (otherOptions.loading) {
                this.closeLoading();
            }
            this.msgSuccess(otherOptions.successMsg);
            return resdata;
        } catch (error) {
            this.msgError(error.toString());
            if (otherOptions.loading) {
                this.closeLoading();
            }
            throw error;
        }
    }
    /**
     * open:void
     */
    public openLoading(fullscreen = true): void {
        this.loadinginstace = Loading.service({ fullscreen });
    }
    /**
     * close:void
     */
    public closeLoading(): void {
        if (this.loadinginstace) {
            this.loadinginstace.close();
            this.loadinginstace = null;
        }
    }
    /**
     * msgSuccess
     */
    public msgSuccess(msg?: string): void {
        Message({
            message: msg ? msg : '操作成功',
            type: 'success',
        });
    }
    /**
     * msgError
     */
    public msgError(msg?: string): void {
        const err = msg || '未知错误';
        Notification({
            type: 'error',
            message: err,
            title: '后台响应错误',
        });
        throw new Error();
    }
}
export const Axios4EleMethods = Axios4Ele.initAxios();
export default Axios4Ele;
