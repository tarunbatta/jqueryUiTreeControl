export class TreeRenderer {
    constructor(settings) {
        this.settings = settings;
        this.displayTree = '';
    }
    buildTree(treeDataStructure) {
        this.settings.onrenderstart();
        this.addNodeToDisplayTree(treeDataStructure);
        this.settings.onrendercomplete();
        return this.displayTree;
    }
    addNodeToDisplayTree(nodes) {
        if (this.displayTree.length === 0) {
            this.displayTree += "<ul style='list-style-type:none;'>";
        }
        else {
            this.displayTree += "<ul style='list-style-type:none; display:none;'>";
        }
        nodes.forEach((node) => {
            this.settings.onbeforenodeinsert(node);
            this.displayTree += this.createNode(node);
            this.settings.onafternodeinsert(node);
            if (node.childnodes && node.childnodes.length > 0) {
                this.addNodeToDisplayTree(node.childnodes);
            }
        });
        this.displayTree += '</ul>';
    }
    createNode(node) {
        let displayTree = '';
        let itemMargin = 20;
        const internalProperties = [
            'id',
            'name',
            'parentId',
            'href',
            'target',
            'tooltip',
            'buttoncheck',
            'buttonadd',
            'buttonremove',
            'isdisabled',
            'ischecked',
            'classnodeicon',
            'childnodes',
        ];
        displayTree += `<li nodeid='${node.id}'`;
        // Add custom properties
        for (const propertyName in node) {
            if (internalProperties.indexOf(propertyName) < 0) {
                displayTree += ` ${propertyName}='${node[propertyName]}'`;
            }
        }
        displayTree += '>';
        displayTree += '<div>';
        displayTree += "<span class='ui-icon ";
        if (node.classnodeicon && node.classnodeicon.length > 0) {
            displayTree += node.classnodeicon;
        }
        else {
            if (node.childnodes && node.childnodes.length > 0) {
                if (this.settings.collapse_tree) {
                    displayTree += this.settings.class_node_expand;
                }
                else {
                    displayTree += this.settings.class_node_collapse;
                }
            }
            else {
                displayTree += this.settings.class_node_item;
            }
        }
        displayTree +=
            "' data-action='nav_items' style='position:absolute; margin-top:1px;'></span>";
        // Add checkbox if needed
        if (node.buttoncheck ||
            (node.buttoncheck == null && this.settings.show_button_check)) {
            displayTree += `<input type='checkbox' style='position:absolute; margin-top:1px;margin-left:${itemMargin}px;'`;
            if (node.isdisabled) {
                displayTree += " disabled='true'";
            }
            if (node.ischecked === true) {
                displayTree += ` checked='true' data-ischecked=${node.ischecked}`;
            }
            else {
                displayTree += " data-ischecked='false'";
            }
            displayTree += '></input>';
            itemMargin += 20;
        }
        // Add add button if needed
        if (node.buttonadd ||
            (node.buttonadd == null && this.settings.show_button_add)) {
            displayTree += `<span class='ui-icon ${this.settings.class_node_add}' data-action='add' style='position:absolute; margin-top:1px;margin-left:${itemMargin}px;'></span>`;
            itemMargin += 20;
        }
        // Add remove button if needed
        if (node.buttonremove ||
            (node.buttonremove == null && this.settings.show_button_remove)) {
            displayTree += `<span class='ui-icon ${this.settings.class_node_remove}' data-action='remove' style='position:absolute; margin-top:1px;margin-left:${itemMargin}px;'></span>`;
            itemMargin += 20;
        }
        // Add link if href exists
        if (node.href) {
            displayTree += `<a href='${node.href}' target='${node.target || ''}'>`;
        }
        displayTree += `<span style='margin-left:${itemMargin}px;' data-action='text'`;
        if (node.tooltip) {
            displayTree += ` title='${node.tooltip}'`;
        }
        displayTree += `>${node.name}</span>`;
        if (node.href) {
            displayTree += '</a>';
        }
        displayTree += '</div>';
        displayTree += '</li>';
        return displayTree;
    }
}
//# sourceMappingURL=treeRenderer.js.map