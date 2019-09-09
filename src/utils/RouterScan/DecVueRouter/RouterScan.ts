import 'reflect-metadata';
import { routeMetaName } from '../Common/constDefine';
import CommonRouteDefine from '../Common/RouteDefine';
import { VuePropsDefine } from '../Common/VuePropsDefine';

export default function(): VuePropsDefine[] {
    const routeAssemble: VuePropsDefine[] = new Array<VuePropsDefine>();
    const allFile = require.context('@', true, /\.vue$/);
    // debugger;
    allFile.keys().forEach((key) => {
        // tslint:disable-next-line:variable-name
        const tmp_module = allFile(key);
        // console.log(key);
        // 然后把扫描到符合标准的文件放到map里面。这个map的value已经是module了，可以直接塞component里面的
        if (Reflect.getOwnMetadata(routeMetaName, tmp_module.default)) {
            const define: CommonRouteDefine = Reflect.getOwnMetadata(routeMetaName, tmp_module.default) as CommonRouteDefine;
            // debugger;
            routeAssemble.push(new VuePropsDefine(define, tmp_module.default));
        }
    });

    return routeAssemble;
}
