/**
 * 定义一个接口用于实现routerbuilder方法，工厂类产出这个接口的类型，用于给外部调用。
 * 从builder输出的router可以给各种router消费者使用，比如vue.use(router)
 */
export interface IRouterBuilder {
    /**
     * 构造一个router，然后使用内置的getRouter返回给调用者或者直接返回（根据具体类实现，可能不提供直接的返回，看具体类实现了）
     * @param moduleMap 传入各种配置的list经过构造成为router
     * @param options 给其他非正常方法传值等留下的接口
     */
    buildRouter(moduleMap?: any, options?: any): any;
    /**
     * 延迟获得该router的方法
     */
    getRouter(): any;
    /**
     * 将建好的router合并到先有router的方法
     * @param existRouter 已经存在于程序中的router
     */
    addToRouter(existRouter: any): any;
}
