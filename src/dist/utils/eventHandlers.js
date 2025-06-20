export class EventHandlers {
    constructor(settings) {
        this.settings = settings;
        this.bindEvents();
    }
    bindEvents() {
        const pluginAny = $.fn.btechcotree;
        // Navigation events
        $(document).on('click', "li div span[data-action='nav_items']", (e) => {
            pluginAny.ToggleCaratIcon($(e.currentTarget));
            pluginAny.ToggleTree($(e.currentTarget));
        });
        // Text selection events
        $(document).on('click', "li div span[data-action='text']", (e) => {
            this.handleTextClick(e);
        });
        // Checkbox events
        $(document).on('click', "li div input[type='checkbox']", (e) => {
            this.handleCheckboxClick(e);
        });
        // Add button events
        $(document).on('click', "li div span[data-action='add']", (e) => {
            this.handleAddClick(e);
        });
        // Remove button events
        $(document).on('click', "li div span[data-action='remove']", (e) => {
            this.handleRemoveClick(e);
        });
    }
    handleTextClick(e) {
        const $target = $(e.currentTarget);
        const nodeId = $target.parent('div').parent('li').attr('nodeid');
        const $node = $target.parent('div').parent('li');
        this.settings.onselectednode(nodeId, $node, e);
        this.highlightNode($target, true);
    }
    handleCheckboxClick(e) {
        const $target = $(e.currentTarget);
        const nodeId = $target.parent('div').parent('li').attr('nodeid');
        const $node = $target.parent('div').parent('li');
        this.settings.onnodecheckselected(nodeId, $node, e);
        this.selectParentChildCheckBox($target, $target.is(':checked'));
    }
    handleAddClick(e) {
        const $target = $(e.currentTarget);
        const nodeId = $target.parent('div').parent('li').attr('nodeid');
        const $node = $target.parent('div').parent('li');
        this.settings.onbeforeaddnode(nodeId, $node, e);
        this.highlightNode($target, true);
        this.settings.onaddnode(nodeId, $node, e);
        this.settings.onafteraddnode(nodeId, $node, e);
    }
    handleRemoveClick(e) {
        const $target = $(e.currentTarget);
        const nodeId = $target.parent('div').parent('li').attr('nodeid');
        const $node = $target.parent('div').parent('li');
        this.settings.onbeforeremovenode(nodeId, $node, e);
        this.highlightNode($target, true);
        const confirmRemove = confirm(this.settings.node_remove_message);
        if (confirmRemove) {
            this.settings.onremovenode(nodeId, $node, e);
        }
        else {
            this.highlightNode($target, false);
        }
        this.settings.onafterremovenode(nodeId, $node, e);
    }
    highlightNode(selectedNode, flag) {
        $(`#${this.settings.containerid} ul li div span[data-action='text']`).removeClass(this.settings.class_node_highlight);
        if (flag) {
            selectedNode
                .parent('div')
                .parent('li')
                .find("span[data-action='text']:first")
                .addClass(this.settings.class_node_highlight);
        }
    }
    selectParentChildCheckBox(selectedNode, flag) {
        // Update status of current node
        this.selectCheckbox(selectedNode, flag);
        // Select all child checkboxes of selected node
        selectedNode
            .parent('div')
            .parent('li')
            .next('ul')
            .find("input[type='checkbox']")
            .each((_, element) => {
            this.selectCheckbox($(element), flag);
        });
        // Select all parent checkboxes of selected node
        selectedNode
            .parents('ul')
            .prev('li')
            .find("div input[type='checkbox']")
            .each((_, element) => {
            this.selectCheckbox($(element), flag);
        });
    }
    selectCheckbox(selectedNode, flag) {
        if (flag) {
            selectedNode.prop('checked', true);
            selectedNode.attr('data-ischecked', 'true');
        }
        else {
            selectedNode.removeAttr('checked');
            selectedNode.attr('data-ischecked', 'false');
        }
    }
    standardizeCheckSelection() {
        // Deselect all the nodes if they don't have any child node which is selected
        $(`#${this.settings.containerid} ul li div`)
            .find("input[type='checkbox']")
            .each((_, element) => {
            const $checkbox = $(element);
            if ($checkbox.is(':checked') &&
                $checkbox.attr('data-ischecked') &&
                $checkbox
                    .parent('div')
                    .parent('li')
                    .next('ul')
                    .children()
                    .find("input[type='checkbox']").length > 0) {
                let isAnyChildSelected = false;
                $checkbox
                    .parent('div')
                    .parent('li')
                    .next('ul')
                    .children()
                    .each((_, childElement) => {
                    const $childCheckbox = $(childElement).find("input[type='checkbox']");
                    if ($childCheckbox.is(':checked') &&
                        $childCheckbox.attr('data-ischecked')) {
                        isAnyChildSelected = true;
                    }
                });
                if (!isAnyChildSelected) {
                    $checkbox.removeAttr('checked');
                    $checkbox.attr('data-ischecked', 'false');
                }
            }
        });
        // Select immediate parents of the selected node if not selected
        $(`#${this.settings.containerid} ul li div`)
            .find("input[type='checkbox'][checked='true']")
            .each((_, element) => {
            $(element)
                .parents('ul')
                .prev('li')
                .each((_, parentElement) => {
                $(parentElement)
                    .find("input[type='checkbox']")
                    .attr('checked', 'true');
                $(parentElement)
                    .find("input[type='checkbox']")
                    .attr('data-ischecked', 'true');
            });
        });
    }
}
//# sourceMappingURL=eventHandlers.js.map