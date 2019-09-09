import VueRouter from 'vue-router';
import { AvuePropsDefine } from './AvuePropsDefine';
import { IRouterBuilder } from '../RouterFactory/IRouterBuilder';
import { IAvueRouteConfig } from './IAvueRouteConfig';
/**
 * 我定义的vuerouter实现方式，通过读取我自定义的router元数据实现
 */
/**
 * 一个针对avue的特殊方法，可以直接传入数组进行build，而不通过普通方式进行
 */
// tslint:disable-next-line:max-classes-per-file
export class AvueRouterBuilder implements IRouterBuilder {
    private avueRouter: AvuePropsDefine[] = [];

    // tslint:disable-next-line:no-empty
    constructor(avueMenu: IAvueRouteConfig[]) {
        this.buildRouter(null, { avueMenu });
    }
    public addToRouter(existRouter: any) {
        (existRouter as VueRouter).addRoutes(this.avueRouter);
    }
    public getRouter() {
        return this.avueRouter;
    }

    /**
     *  基于avue-cli创造一个router
     * @param moduleMap 这个参数不参与avue的计算判断
     * @param options 在此处传输一个avueMenu，包括可能从后台读出的效果
     */
    public buildRouter(
        moduleMap?: Map<string, NodeModule> | null,
        options?: {
            avueMenu: IAvueRouteConfig[];
        },
    ): void {
        if (options && options.avueMenu) {
            const build = this.avueFormateRoutes(options.avueMenu, true);
            this.avueRouter = build;
        }
    }
    /**
     * 递归构建avue风格router的方法
     * @param aMenu avue风格的route配置文件
     * @param first 是否为第一个
     */
    public avueFormateRoutes(aMenu: IAvueRouteConfig[], first: boolean): AvuePropsDefine[] {
        const aRouter = [];
        if (aMenu.length === 0) {
            return [];
        }
        for (const routelike of aMenu) {
            // tslint:disable-next-line:prefer-const
            let oMenu: AvuePropsDefine = new AvuePropsDefine(routelike);
            oMenu.setComponent(routelike.component);
            if (routelike.children) {
                oMenu.children = this.avueFormateRoutes(routelike.children, false);
            }
            aRouter.push(oMenu);
        }
        return aRouter;
    }
}
