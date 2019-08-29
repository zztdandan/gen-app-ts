export interface IAxoisWrapMethods {
    get(url: string, data: object): object;
    post(url: string, data: object): object;
    postJson(url: string, data: object): object;
    postForm(url: string, data: object): object;
    put(url: string, data: object): object;
    putJson(url: string, data: object): object;
    putForm(url: string, data: object): object;
    delete(url: string, data: object): object;
    deleteJson(url: string, data: object): object;
    deleteForm(url: string, data: object): object;
    patch(url: string, data: object): object;
    patchJson(url: string, data: object): object;
    patchForm(url: string, data: object): object;
}
