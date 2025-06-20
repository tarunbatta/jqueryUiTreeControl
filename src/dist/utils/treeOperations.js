export class TreeOperations {
    constructor(settings) {
        this.settings = settings;
    }
    getRootNodes() {
        return $(`#${this.settings.containerid}> ul > li > div > span:nth-child(1)`);
    }
    toggleTree(selectedNode) {
        selectedNode.parent('div').parent('li').next('ul').toggle();
    }
    toggleCaratIcon(selectedNode) {
        selectedNode.each((_, element) => {
            const $element = $(element);
            if (!$element.hasClass(this.settings.class_node_item)) {
                if ($element.hasClass(this.settings.class_node_expand)) {
                    $element.removeClass(this.settings.class_node_expand);
                    $element.addClass(this.settings.class_node_collapse);
                }
                else if ($element.hasClass(this.settings.class_node_collapse)) {
                    $element.removeClass(this.settings.class_node_collapse);
                    $element.addClass(this.settings.class_node_expand);
                }
                else {
                    $element.addClass(this.settings.class_node_expand);
                }
            }
        });
    }
    expandCollapseTree(selectedNode, flag) {
        if (flag) {
            if (!selectedNode.parent('div').parent('li').next('ul').is(':visible')) {
                selectedNode.parent('div').parent('li').next('ul').show();
                this.toggleCaratIcon(selectedNode);
            }
        }
        else {
            if (selectedNode.parent('div').parent('li').next('ul').is(':visible')) {
                selectedNode.parent('div').parent('li').next('ul').hide();
                this.toggleCaratIcon(selectedNode);
            }
        }
    }
    expand() {
        const rootNodes = this.getRootNodes();
        this.expandCollapseTree(rootNodes, true);
    }
    collapse() {
        const rootNodes = this.getRootNodes();
        this.expandCollapseTree(rootNodes, false);
    }
    toggle() {
        const rootNodes = this.getRootNodes();
        this.toggleCaratIcon(rootNodes);
        this.toggleTree(rootNodes);
    }
    enableRootCarats() {
        const rootNodes = this.getRootNodes();
        this.toggleCaratIcon(rootNodes);
        this.toggleTree(rootNodes);
        if (this.settings.collapse_tree) {
            this.toggleCaratIcon(rootNodes);
            this.toggleTree(rootNodes);
        }
    }
}
//# sourceMappingURL=treeOperations.js.map