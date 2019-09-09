import { List } from 'linq.ts';

/**
 *
 * @param list 要转化为树的列表
 * @param listAttr 列表的一些属性配置信息
 */
export function list2Tree(list: any[], listAttr: ListAttribute) {
    // 先找出当前状态下的母节点
    const treeRes = [];
    // 选出这里面的根节点
    const lootNode: any[] = new List(list)
        .Where((x) => x[listAttr.listParentidStr as string] === listAttr.rootParentStr)
        .ToArray();
    // 选出不是根节点的项
    const listExceptLoot: any[] = new List(list).Except(new List(lootNode)).ToArray();
    lootNode.forEach((ele) => {
        ele.label = ele[listAttr.listLabelStr as string]
            ? ele[listAttr.listLabelStr as string]
            : ele[listAttr.listIdStr as string];
        ele[listAttr.listchildrenStr as string] = list2Tree(listExceptLoot, {
            listIdStr: listAttr.listIdStr,
            listLabelStr: listAttr.listLabelStr,
            listParentidStr: listAttr.listParentidStr,
            listchildrenStr: listAttr.listchildrenStr,
            rootParentStr: ele[listAttr.listIdStr as string],
        });
    });
    return lootNode;
}
/**
 * 注意，该类建议使用new的方式定义，而不是直接定义，否则会缺失大多数属性
 */
export class ListAttribute {
    public listIdStr: string;
    public listLabelStr: string;
    public listParentidStr: string;
    public listchildrenStr: string;
    public rootParentStr?: string | number | null;
    /**
     * 建议使用初始化函数初始化而不是直接新建
     */
    constructor(
        plistIdStr?: string,
        plistLabelStr?: string,
        plistParentidStr?: string,
        plistchildrenStr?: string,
        prootParentStr?: string | number | null,
    ) {
        this.listIdStr = plistIdStr ? plistIdStr : 'id';
        this.listLabelStr = plistLabelStr ? plistLabelStr : 'name';
        this.listParentidStr = plistParentidStr ? plistParentidStr : 'parentid';
        this.listchildrenStr = plistchildrenStr ? plistchildrenStr : 'children';
        this.rootParentStr = prootParentStr ? prootParentStr : null;
    }
}

// export function tree_to_list(tree, children_name, id_name) {
//     let new_list = [];
//     children_name = children_name || 'children';
//     id_name = id_name || 'id';
//     tree.forEach((ele) => {
//         let childList = [];
//         if (ele[children_name] && ele[children_name].length > 0) {
//             childList = childList.concat(tree_to_list(ele[children_name], children_name));
//         }
//         ele[children_name] = [];
//         new_list = new_list.concat(...[ele, childList]);
//     });
//     return new_list;
// }
