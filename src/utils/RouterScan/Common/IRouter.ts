/**
 * 包含一个router基础的schema
 */
export interface IRouter {
    isRouter?: boolean;
    name: string;
    label?: string;
    parentRoute?: string | null;
    manuallyUrl?: string | null;
    meta?: object;
    icon?: string;
}
