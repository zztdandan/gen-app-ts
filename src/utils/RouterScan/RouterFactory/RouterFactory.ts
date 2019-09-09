import { IRouterBuilder } from './IRouterBuilder';
import { DecVueRouterBuilder } from '../DecVueRouter/DecVueRouterBuilder';
export class RouterFactory {
    private builder?: IRouterBuilder;
    constructor(builder?: IRouterBuilder) {
        this.builder = builder ? builder : new DecVueRouterBuilder(true);
    }
    public getRouter(moduleMap: Map<string, NodeModule>): any {
        if (this.builder) {
            this.builder.buildRouter(moduleMap);
            return this.builder.getRouter();
        } else {
            throw new Error('没有builder，出错');
        }
    }
    public getBuilder() {
        return this.builder;
    }
}
