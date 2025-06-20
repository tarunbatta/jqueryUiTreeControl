export class TreeOperations {
  constructor(private settings: any) {}

  public getRootNodes(): JQuery {
    return $(
      `#${this.settings.containerid}> ul > li > div > span:nth-child(1)`
    );
  }

  public toggleTree(selectedNode: JQuery): void {
    selectedNode.parent('div').parent('li').next('ul').toggle();
  }

  public toggleCaratIcon(selectedNode: JQuery): void {
    selectedNode.each((_, element) => {
      const $element = $(element);
      if (!$element.hasClass(this.settings.class_node_item)) {
        if ($element.hasClass(this.settings.class_node_expand)) {
          $element.removeClass(this.settings.class_node_expand);
          $element.addClass(this.settings.class_node_collapse);
        } else if ($element.hasClass(this.settings.class_node_collapse)) {
          $element.removeClass(this.settings.class_node_collapse);
          $element.addClass(this.settings.class_node_expand);
        } else {
          $element.addClass(this.settings.class_node_expand);
        }
      }
    });
  }

  public expandCollapseTree(selectedNode: JQuery, flag: boolean): void {
    if (flag) {
      if (!selectedNode.parent('div').parent('li').next('ul').is(':visible')) {
        selectedNode.parent('div').parent('li').next('ul').show();
        this.toggleCaratIcon(selectedNode);
      }
    } else {
      if (selectedNode.parent('div').parent('li').next('ul').is(':visible')) {
        selectedNode.parent('div').parent('li').next('ul').hide();
        this.toggleCaratIcon(selectedNode);
      }
    }
  }

  public expand(): void {
    const rootNodes = this.getRootNodes();
    this.expandCollapseTree(rootNodes, true);
  }

  public collapse(): void {
    const rootNodes = this.getRootNodes();
    this.expandCollapseTree(rootNodes, false);
  }

  public toggle(): void {
    const rootNodes = this.getRootNodes();
    this.toggleCaratIcon(rootNodes);
    this.toggleTree(rootNodes);
  }

  public enableRootCarats(): void {
    const rootNodes = this.getRootNodes();
    this.toggleCaratIcon(rootNodes);
    this.toggleTree(rootNodes);

    if (this.settings.collapse_tree) {
      this.toggleCaratIcon(rootNodes);
      this.toggleTree(rootNodes);
    }
  }
}
