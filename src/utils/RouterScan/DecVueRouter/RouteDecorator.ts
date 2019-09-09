import 'reflect-metadata';
import { routeMetaName } from '../Common/constDefine';
import { IRouter } from '../Common/IRouter';
import RouteDefine from '../Common/RouteDefine';
export function Route(setting?: IRouter) {
    console.log('运行router注解，加入元数据');
    // tslint:disable-next-line:only-arrow-functions
    return function(target: any) {
        if (setting) {
            Reflect.defineMetadata(routeMetaName, new RouteDefine(setting), target);
            // debugger;
        }
        return target;
    };
}
