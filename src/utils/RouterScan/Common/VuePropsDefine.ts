import { RouteConfig } from 'vue-router';
import { IRouter } from './IRouter';
import CommonRouteDefine from './RouteDefine';
import { routeMetaName } from './constDefine';
/**
 * 除了自定义irouter之外，多实现了vue的router规则
 */
export class VuePropsDefine extends CommonRouteDefine implements IRouter, RouteConfig {
    public path: string = '';
    public component?: any | null;
    public children?: RouteConfig[];

    constructor(route: IRouter, module?: NodeModule) {
        super(route);
        this.path = this.calcUrlPath();
        // debugger;
        if (module) {
            this.component = Reflect.getOwnMetadata(routeMetaName, module) ? module : null;
        }
    }
    /**
     * 规定规则，当不人工指定path的时候path就是名字加/在前面
     * @param setting iroute配置文件
     */
    public calcUrlPath(): string {
        if (this.manuallyUrl) {
            return this.manuallyUrl;
        } else {
            return `/${this.name}`;
        }
    }
}
