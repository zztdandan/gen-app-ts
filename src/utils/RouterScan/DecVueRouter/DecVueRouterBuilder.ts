import { IRouterBuilder } from '../RouterFactory/IRouterBuilder';

import { VuePropsDefine } from '../Common/VuePropsDefine';
import RouterScan from './RouterScan';
import { list2Tree, ListAttribute } from '@/utils/List2Tree/List2Tree';
import VueRouter from 'vue-router';
// tslint:disable-next-line:max-classes-per-file
export class DecVueRouterBuilder implements IRouterBuilder {
    public routScanResult: VuePropsDefine[] | null = null;
    private routerResult: any;

    constructor(scan?: boolean) {
        // tslint:disable-next-line:no-empty
        if (typeof scan !== 'undefined' && scan === false) {
        } else {
            this.routScanResult = RouterScan();
        }
    }
    public buildRouter(moduleMap?: VuePropsDefine[], options?: any): any {
        const tmpModule: VuePropsDefine[] = moduleMap
            ? moduleMap
            : this.routScanResult
            ? this.routScanResult
            : RouterScan();
        const treeModule = list2Tree(tmpModule, new ListAttribute('name', 'label', 'parentRoute', 'children', null));
        this.routerResult = treeModule;
        return this.routerResult;
    }
    public getRouter() {
        return this.routerResult;
    }
    public addToRouter(existRouter: any): any {
        // debugger;
        return (existRouter as VueRouter).addRoutes(this.routerResult);
    }
}
