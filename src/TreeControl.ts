import { TreeSettings, TreeNode } from './types';
import { defaultSettings } from './utils/defaults';
import { DataLoader } from './utils/dataLoader';
import { DataConverter } from './utils/dataConverter';
import { TreeRenderer } from './utils/treeRenderer';
import { EventHandlers } from './utils/eventHandlers';
import { TreeOperations } from './utils/treeOperations';

export class TreeControl {
  private settings: TreeSettings;
  private dataLoader!: DataLoader;
  private dataConverter!: DataConverter;
  private treeRenderer!: TreeRenderer;
  private eventHandlers!: EventHandlers;
  private treeOperations!: TreeOperations;

  constructor(options: Partial<TreeSettings>) {
    this.settings = { ...defaultSettings, ...options };
    this.initializeComponents();
  }

  private initializeComponents(): void {
    this.dataLoader = new DataLoader(this.settings);
    this.dataConverter = new DataConverter(this.settings);
    this.treeRenderer = new TreeRenderer(this.settings);
    this.eventHandlers = new EventHandlers(this.settings);
    this.treeOperations = new TreeOperations(this.settings);
  }

  public async initialize(): Promise<void> {
    this.settings.onstart();

    this.settings.onprocessingstart();
    await this.buildTreeDataStructure();
    this.settings.onprocessingcomplete();

    this.settings.onrenderstart();
    this.buildTree();
    this.settings.onrendercomplete();

    this.settings.onend();
  }

  private async buildTreeDataStructure(): Promise<void> {
    await this.dataLoader.loadData();
    const treeDataStructure = this.dataConverter.convertData();
    this.renderTree(treeDataStructure);
  }

  private renderTree(treeDataStructure: TreeNode[]): void {
    const displayTree = this.treeRenderer.buildTree(treeDataStructure);
    $(`#${this.settings.containerid}`).append(displayTree);
  }

  private buildTree(): void {
    this.treeOperations.enableRootCarats();
    this.eventHandlers.standardizeCheckSelection();
  }

  // Public API methods
  public getRootNodes(): JQuery {
    return this.treeOperations.getRootNodes();
  }

  public toggleTree(selectedNode: JQuery): void {
    this.treeOperations.toggleTree(selectedNode);
  }

  public toggleCaratIcon(selectedNode: JQuery): void {
    this.treeOperations.toggleCaratIcon(selectedNode);
  }

  public expandCollapseTree(selectedNode: JQuery, flag: boolean): void {
    this.treeOperations.expandCollapseTree(selectedNode, flag);
  }

  public expand(): void {
    this.treeOperations.expand();
  }

  public collapse(): void {
    this.treeOperations.collapse();
  }

  public toggle(): void {
    this.treeOperations.toggle();
  }
}
