import { TreeDataType, TreeDataFormat, } from '../types';
export class DataConverter {
    constructor(settings) {
        this.settings = settings;
        this.treeDataStructure = [];
    }
    convertData() {
        this.settings.onbeforedataconversion();
        switch (this.settings.datatype) {
            case TreeDataType.Json:
                this.convertJsonData();
                break;
            case TreeDataType.Xml:
                this.convertXmlData();
                break;
        }
        this.settings.onafterdataconversion();
        return this.treeDataStructure;
    }
    convertJsonData() {
        switch (this.settings.dataformat) {
            case TreeDataFormat.Linear:
                this.convertJsonLinearToTreeObject(this.settings.dataset.root);
                break;
            case TreeDataFormat.Hierarchy:
                this.treeDataStructure = this.settings.dataset.root;
                break;
        }
    }
    convertXmlData() {
        switch (this.settings.dataformat) {
            case TreeDataFormat.Linear:
                this.convertLinearXmlToTreeObject(this.settings.dataset);
                break;
            case TreeDataFormat.Hierarchy:
                this.convertHierarchyXmlToTreeObject(this.settings.dataset);
                break;
        }
    }
    convertJsonLinearToTreeObject(dataset) {
        dataset.forEach((item) => {
            const node = this.getNodeObjectFromJson(item);
            if (this.treeDataStructure.length === 0 || node.parentId === 0) {
                this.treeDataStructure.push(node);
            }
            else {
                this.addNodeToTreeDataStructure(this.treeDataStructure, node);
            }
        });
    }
    convertLinearXmlToTreeObject(dataset) {
        dataset.find('node').each((_, element) => {
            const node = this.getNodeObjectFromXml($(element));
            if (this.treeDataStructure.length === 0 || node.parentId === 0) {
                this.treeDataStructure.push(node);
            }
            else {
                this.addNodeToTreeDataStructure(this.treeDataStructure, node);
            }
        });
    }
    convertHierarchyXmlToTreeObject(dataset) {
        dataset.find('node').each((_, element) => {
            const node = this.getNodeObjectFromXml($(element));
            if (this.treeDataStructure.length === 0 || node.parentId === 0) {
                this.treeDataStructure.push(node);
            }
            else {
                this.addNodeToTreeDataStructure(this.treeDataStructure, node);
            }
        });
    }
    getNodeObjectFromJson(jsonNode) {
        const result = {
            id: jsonNode.id,
            name: jsonNode.name,
            parentId: jsonNode.parentId,
            href: jsonNode.href ?? undefined,
            target: jsonNode.target ?? undefined,
            tooltip: jsonNode.tooltip ?? undefined,
            buttoncheck: jsonNode.buttoncheck ?? undefined,
            buttonadd: jsonNode.buttonadd ?? undefined,
            buttonremove: jsonNode.buttonremove ?? undefined,
            isdisabled: jsonNode.isdisabled ?? undefined,
            ischecked: jsonNode.ischecked ?? undefined,
            classnodeicon: jsonNode.classnodeicon ?? undefined,
            childnodes: [],
        };
        // Copy additional properties
        for (const propertyName in jsonNode) {
            if (!(propertyName in result)) {
                result[propertyName] = jsonNode[propertyName];
            }
        }
        return result;
    }
    getNodeObjectFromXml(xmlNode) {
        let parentId = 0;
        if (xmlNode.parent().attr('id') != null) {
            parentId = xmlNode.parent().attr('id');
        }
        else if (xmlNode.attr('parentId') != null) {
            parentId = xmlNode.attr('parentId');
        }
        const result = {
            id: xmlNode.attr('id'),
            name: xmlNode.attr('name'),
            parentId: parentId,
            href: xmlNode.attr('href') ?? undefined,
            target: xmlNode.attr('target') ?? undefined,
            tooltip: xmlNode.attr('tooltip') ?? undefined,
            buttoncheck: xmlNode.attr('buttoncheck') === 'true' ? true : undefined,
            buttonadd: xmlNode.attr('buttonadd') === 'true' ? true : undefined,
            buttonremove: xmlNode.attr('buttonremove') === 'true' ? true : undefined,
            isdisabled: xmlNode.attr('isdisabled') === 'true' ? true : undefined,
            ischecked: xmlNode.attr('ischecked') === 'true' ? true : undefined,
            classnodeicon: xmlNode.attr('classnodeicon') ?? undefined,
            childnodes: [],
        };
        // Copy additional attributes
        const attributes = xmlNode[0]?.attributes;
        if (attributes) {
            Array.from(attributes).forEach((attr) => {
                if (!(attr.name in result)) {
                    result[attr.name] = attr.value;
                }
            });
        }
        return result;
    }
    addNodeToTreeDataStructure(nodes, childNode) {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (!node)
                continue;
            if (node.id === childNode.parentId) {
                if (!node.childnodes || node.childnodes.length === 0) {
                    node.childnodes = [];
                }
                node.childnodes.push(childNode);
                break;
            }
            else if (Array.isArray(node.childnodes)) {
                this.addNodeToTreeDataStructure(node.childnodes, childNode);
            }
        }
    }
}
//# sourceMappingURL=dataConverter.js.map