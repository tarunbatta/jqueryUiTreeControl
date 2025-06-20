import { TreeNode } from '../types';
export declare class DataConverter {
    private settings;
    private treeDataStructure;
    constructor(settings: any);
    convertData(): TreeNode[];
    private convertJsonData;
    private convertXmlData;
    private convertJsonLinearToTreeObject;
    private convertLinearXmlToTreeObject;
    private convertHierarchyXmlToTreeObject;
    private getNodeObjectFromJson;
    private getNodeObjectFromXml;
    private addNodeToTreeDataStructure;
}
//# sourceMappingURL=dataConverter.d.ts.map