import { IRouter } from '../Common/IRouter';
import { RouteConfig } from 'vue-router';
import { VuePropsDefine } from '../Common/VuePropsDefine';
/**
 * 使用继承的方式完成绝大多数属性的设置。转换的内容其实不是很多
 */
// tslint:disable-next-line:max-classes-per-file
export class AvuePropsDefine extends VuePropsDefine implements RouteConfig, IRouter {
    public children?: RouteConfig[];
    constructor(route: IRouter) {
        super(route);
        this.children = [];
    }
    public setComponent(componentString: string): void {
        this.component = require(componentString);
    }
}
