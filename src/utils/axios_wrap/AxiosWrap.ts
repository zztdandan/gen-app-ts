/**
 * ajax工具包
 * 返回axiosWrap对象，共有两组函数，分别是form-data和json方式，
 * form-data方式：get, post, put, delete, patch
 * json方式：getJson, postJson, putJson, deleteJson, patchJson
 *
 * 为了统一习惯，所有这些函数的参数均是(url,data,options，_switch)，除了url必填外，其它可不提供，如果提供options则传递到底层axios的options中
 * 其中successs和error可以分别是数组，如this.$$get(url,data,[fn1,fn2],...)
 * 返回的是Promise对象，可以使用then和catch，如this.$$get(url).then(fn)或者this.$$get(url,data,[fn1,fn2],[fn3,fn4]).then(fn).catch(err)
 *
 *
 * 为了便于使用，分别在window和vue上绑定这些函数，分别是
 * window.LG_axios = axiosWrap;
 * Vue.prototype["$$" + method]=fn,其中是上面提到的get, post, put, delete, patch及getJson, postJson, putJson, deleteJson,
 * patchJson
 * 使用方法是：
 * 同一个window下，直接使用，如LG_axios.get(url,data,successs,error,options)
 * 在Vue组件内，使用this调用,如this.$$get(url,data,successs,error,options),这个特别要注意，使用箭头函数时this不在指向Vue实例
 *
 * 2019-08-29 增加form=multipart
 */
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getToken } from './JsToken';
import { Object } from 'ts-toolbelt';
import qs from 'qs';
import { type } from 'os';
import { IAxoisWrapMethods } from './IAxoisWrapMethods';
import { IResponseData } from './IResponseData';
const TokenKey = 'ACCESS_TOKEN';

class AxiosWrap {
    public static initAxios(): IAxoisWrapMethods {
        const wrap = new this();
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

    public methods: string[] = ['get', 'post', 'put', 'delete', 'patch'];
    public contentTypeDefines: Array<{ suffix: string; type: string }> = [
        { suffix: '', type: 'application/x-www-form-urlencoded' },
        { suffix: 'Json', type: 'application/json' },
        { suffix: 'Form', type: 'multipart/form-data' },
    ];
    protected service: AxiosInstance;
    /**
     * 构造service
     */
    constructor() {
        this.service = axios.create({ timeout: 1000 * 60 });
        // request自定义拦截
        this.service.interceptors.request.use(
            (config) => {
                config.headers[TokenKey] = getToken(TokenKey);
                return config;
            },
            (error) => {
                // tslint:disable-next-line: no-console
                console.log('axios拦截：出现错误', error);
                Promise.reject(error);
            },
        );
    }
    public checkResponse(response: AxiosResponse<any>): object {
        // tslint:disable-next-line:ban-types
        let resdata: IResponseData;
        try {
            resdata = response.data;
            if (response.status !== 200) {
                throw Error(`返回出错:${response.status || 302}:${response.statusText || '未知错误'}`);
            }
            if (resdata.code === 0) {
                return resdata.data || {};
            } else {
                throw Error(`api返回了错误—${resdata.extMsg},${resdata.msg}`);
            }
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.log('非标准类型');
            // 不符合标准格式，
            return response.data;
        }
    }

    /**
     * 通用ajax
     * @param url 传入url值
     * @param data 传入data
     * @param params 传入参数
     * @param options 其他配置
     */
    // tslint:disable-next-line:max-line-length
    public async CommenAjax(
        method: string,
        dataType: string,
        url: string,
        data: object = {},
        params: object = {},
        options: object = {},
        otherOptions: object = {},
    ): Promise<object> {
        try {
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
            return resdata;
        } catch (error) {
            throw error;
        }
    }

    protected changeUrl(url: string): string {
        // debugger;
        return /(^http(s?):\/\/)|(^\/mock.*\/)|(^\/api\/)|(^\/dfs\/)/.test(url) ? url : '/api' + url;
    }

    /**
     *  根据数据类型给与data一定的转化
     * @param data 数据
     * @param dataType 传输的数据类型
     */
    protected dataConvert(data: any, dataType: string): any {
        switch (dataType) {
            case 'application/x-www-form-urlencoded':
                return qs.stringify(data);

            case 'application/json':
                return data;

            case 'multipart/form-data': {
                const fd: FormData = new FormData();
                // tslint:disable-next-line:forin
                for (const key in data) {
                    fd.append(key, data[key]);
                }
                return fd;
            }
            default:
                return data;
        }
    }
}
//抛出一个独立的聚合模块
export const axiosMethods = AxiosWrap.initAxios();
export default AxiosWrap;
