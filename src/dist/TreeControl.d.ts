import { TreeSettings } from './types';
export declare class TreeControl {
    private settings;
    private dataLoader;
    private dataConverter;
    private treeRenderer;
    private eventHandlers;
    private treeOperations;
    constructor(options: Partial<TreeSettings>);
    private initializeComponents;
    initialize(): Promise<void>;
    private buildTreeDataStructure;
    private renderTree;
    private buildTree;
    getRootNodes(): JQuery;
    toggleTree(selectedNode: JQuery): void;
    toggleCaratIcon(selectedNode: JQuery): void;
    expandCollapseTree(selectedNode: JQuery, flag: boolean): void;
    expand(): void;
    collapse(): void;
    toggle(): void;
}
//# sourceMappingURL=TreeControl.d.ts.map