import { IRouter } from './IRouter';
/**
 * 定义一个静态方法来描述Router的装饰器，包括足够的信息使得该类能够注册到router里面
 * 非装饰器方法也可以通过这个类获得所需schema的默认值
 */
class RouteDefine implements IRouter {
    /**
     * 该类是否是接口，可以自行设定为不是，则可以屏蔽对该接口的生成
     */
    public isRouter: boolean = true;
    /**
     * router的名字
     */
    public name: string = '';
    /**
     * 若需要形成menu，这里会成为目录显示的名称
     * 若需要形成i18n，这个字段的内容是i18n的key
     */
    public label: string = '';
    /**
     * 如果需要有层次目录，可在这里设置，会设置父子层级的router
     */
    public menuTree?: string[] = [];
    /**
     * 如果需要自定义url
     */
    public manuallyUrl?: string | null;
    public meta?: object = {};

    public parentRoute?: string | null = null;
    /**
     *  初始化这个装饰器，然后可以使用自带的函数变化为vue的router或其他的router
     * @param setting 一个规定类型的初始化文本
     */
    constructor(setting?: IRouter) {
        if (setting) {
            this.isRouter = typeof setting.isRouter !== 'undefined' && setting.isRouter === false ? false : true;
            this.label = setting.label ? setting.label : 'name';
            this.manuallyUrl = setting.manuallyUrl ? setting.manuallyUrl : null;
            this.name = setting.name;
            this.meta = setting.meta ? setting.meta : {};
            this.parentRoute = setting.parentRoute ? setting.parentRoute : null;
        } else {
            this.isRouter = false;
        }
    }
}
export default RouteDefine;
