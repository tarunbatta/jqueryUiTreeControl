import {
  TreeNode,
  JsonNode,
  TreeDataType,
  TreeDataFormat,
  XmlDataset,
} from '../types';

export class DataConverter {
  private treeDataStructure: TreeNode[] = [];

  constructor(private settings: any) {}

  public convertData(): TreeNode[] {
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

  private convertJsonData(): void {
    switch (this.settings.dataformat) {
      case TreeDataFormat.Linear:
        this.convertJsonLinearToTreeObject(this.settings.dataset.root);
        break;
      case TreeDataFormat.Hierarchy:
        this.treeDataStructure = this.settings.dataset.root;
        break;
    }
  }

  private convertXmlData(): void {
    switch (this.settings.dataformat) {
      case TreeDataFormat.Linear:
        this.convertLinearXmlToTreeObject(this.settings.dataset);
        break;
      case TreeDataFormat.Hierarchy:
        this.convertHierarchyXmlToTreeObject(this.settings.dataset);
        break;
    }
  }

  private convertJsonLinearToTreeObject(dataset: JsonNode[]): void {
    dataset.forEach((item) => {
      const node = this.getNodeObjectFromJson(item);

      if (this.treeDataStructure.length === 0 || node.parentId === 0) {
        this.treeDataStructure.push(node);
      } else {
        this.addNodeToTreeDataStructure(this.treeDataStructure, node);
      }
    });
  }

  private convertLinearXmlToTreeObject(dataset: XmlDataset): void {
    dataset.find('node').each((_, element) => {
      const node = this.getNodeObjectFromXml($(element));

      if (this.treeDataStructure.length === 0 || node.parentId === 0) {
        this.treeDataStructure.push(node);
      } else {
        this.addNodeToTreeDataStructure(this.treeDataStructure, node);
      }
    });
  }

  private convertHierarchyXmlToTreeObject(dataset: XmlDataset): void {
    dataset.find('node').each((_, element) => {
      const node = this.getNodeObjectFromXml($(element));

      if (this.treeDataStructure.length === 0 || node.parentId === 0) {
        this.treeDataStructure.push(node);
      } else {
        this.addNodeToTreeDataStructure(this.treeDataStructure, node);
      }
    });
  }

  private getNodeObjectFromJson(jsonNode: JsonNode): TreeNode {
    const result: TreeNode = {
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
        (result as any)[propertyName] = jsonNode[propertyName];
      }
    }

    return result;
  }

  private getNodeObjectFromXml(xmlNode: JQuery): TreeNode {
    let parentId: string | number = 0;

    if (xmlNode.parent().attr('id') != null) {
      parentId = xmlNode.parent().attr('id')!;
    } else if (xmlNode.attr('parentId') != null) {
      parentId = xmlNode.attr('parentId')!;
    }

    const result: TreeNode = {
      id: xmlNode.attr('id')!,
      name: xmlNode.attr('name')!,
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
          (result as any)[attr.name] = attr.value;
        }
      });
    }

    return result;
  }

  private addNodeToTreeDataStructure(
    nodes: TreeNode[],
    childNode: TreeNode
  ): void {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (!node) continue;
      if (node.id === childNode.parentId) {
        if (!node.childnodes || node.childnodes.length === 0) {
          node.childnodes = [];
        }
        node.childnodes.push(childNode);
        break;
      } else if (Array.isArray(node.childnodes)) {
        this.addNodeToTreeDataStructure(node.childnodes, childNode);
      }
    }
  }
}
