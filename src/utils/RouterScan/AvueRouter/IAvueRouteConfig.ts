import { IRouter } from '../Common/IRouter';
export interface IAvueRouteConfig extends IRouter {
    component: string;
    children?: IAvueRouteConfig[];
}
