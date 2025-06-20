import { defaultSettings } from './utils/defaults';
import { DataLoader } from './utils/dataLoader';
import { DataConverter } from './utils/dataConverter';
import { TreeRenderer } from './utils/treeRenderer';
import { EventHandlers } from './utils/eventHandlers';
import { TreeOperations } from './utils/treeOperations';
export class TreeControl {
    constructor(options) {
        this.settings = { ...defaultSettings, ...options };
        this.initializeComponents();
    }
    initializeComponents() {
        this.dataLoader = new DataLoader(this.settings);
        this.dataConverter = new DataConverter(this.settings);
        this.treeRenderer = new TreeRenderer(this.settings);
        this.eventHandlers = new EventHandlers(this.settings);
        this.treeOperations = new TreeOperations(this.settings);
    }
    async initialize() {
        this.settings.onstart();
        this.settings.onprocessingstart();
        await this.buildTreeDataStructure();
        this.settings.onprocessingcomplete();
        this.settings.onrenderstart();
        this.buildTree();
        this.settings.onrendercomplete();
        this.settings.onend();
    }
    async buildTreeDataStructure() {
        await this.dataLoader.loadData();
        const treeDataStructure = this.dataConverter.convertData();
        this.renderTree(treeDataStructure);
    }
    renderTree(treeDataStructure) {
        const displayTree = this.treeRenderer.buildTree(treeDataStructure);
        $(`#${this.settings.containerid}`).append(displayTree);
    }
    buildTree() {
        this.treeOperations.enableRootCarats();
        this.eventHandlers.standardizeCheckSelection();
    }
    // Public API methods
    getRootNodes() {
        return this.treeOperations.getRootNodes();
    }
    toggleTree(selectedNode) {
        this.treeOperations.toggleTree(selectedNode);
    }
    toggleCaratIcon(selectedNode) {
        this.treeOperations.toggleCaratIcon(selectedNode);
    }
    expandCollapseTree(selectedNode, flag) {
        this.treeOperations.expandCollapseTree(selectedNode, flag);
    }
    expand() {
        this.treeOperations.expand();
    }
    collapse() {
        this.treeOperations.collapse();
    }
    toggle() {
        this.treeOperations.toggle();
    }
}
//# sourceMappingURL=TreeControl.js.map