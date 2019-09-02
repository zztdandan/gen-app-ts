import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getToken } from './JsToken';
import qs from 'qs';
import { IAxoisWrapMethods } from './IAxoisWrapMethods';
import { IResponseData } from './IResponseData';

// 抛出一个独立的聚合模块

export const TokenKey = 'ACCESS_TOKEN';
export class AxiosWrapBase {
    public static initAxios(): IAxoisWrapMethods {
        const wrap = new AxiosWrapBase();
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
    public contentTypeDefines: Array<{
        suffix: string;
        type: string;
    }> = [
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
export const axiosMethods = AxiosWrapBase.initAxios();
