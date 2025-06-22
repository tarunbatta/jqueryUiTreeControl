export enum TreeDataType {
  Json = 1,
  Xml = 2,
}

export enum TreeDataFormat {
  Linear = 1,
  Hierarchy = 2,
}

export interface TreeNode {
  id: string | number;
  name: string;
  parentId: string | number;
  href?: string | undefined;
  target?: string | undefined;
  tooltip?: string | undefined;
  buttoncheck?: boolean | undefined;
  buttonadd?: boolean | undefined;
  buttonremove?: boolean | undefined;
  isdisabled?: boolean | undefined;
  ischecked?: boolean | undefined;
  classnodeicon?: string | undefined;
  childnodes: TreeNode[];
  [key: string]: unknown; // Allow additional properties
}

export interface TreeSettings {
  containerid: string | null;
  url: string | null;
  async: boolean;
  dataset: unknown;
  datatype: TreeDataType;
  dataformat: TreeDataFormat;
  class_node_collapse: string;
  class_node_expand: string;
  class_node_item: string;
  collapse_tree: boolean;
  class_node_highlight: string;
  class_node_add: string;
  class_node_remove: string;
  show_button_check: boolean;
  show_button_add: boolean;
  show_button_remove: boolean;
  node_remove_message: string;
  onstart: () => void;
  onend: () => void;
  onprocessingstart: () => void;
  onprocessingcomplete: () => void;
  onprocessingerror: (
    xhr: JQuery.jqXHR,
    ajaxOptions: string,
    thrownError: string
  ) => void;
  onbeforedataconversion: () => void;
  onafterdataconversion: () => void;
  onrenderstart: () => void;
  onrendercomplete: () => void;
  onbeforenodeinsert: (node: TreeNode) => void;
  onafternodeinsert: (node: TreeNode) => void;
  onselectednode: (
    id: string | number,
    node: JQuery,
    sender: JQuery.Event
  ) => void;
  onbeforeaddnode: (
    id: string | number,
    node: JQuery,
    sender: JQuery.Event
  ) => void;
  onafteraddnode: (
    id: string | number,
    node: JQuery,
    sender: JQuery.Event
  ) => void;
  onbeforeremovenode: (
    id: string | number,
    node: JQuery,
    sender: JQuery.Event
  ) => void;
  onafterremovenode: (
    id: string | number,
    node: JQuery,
    sender: JQuery.Event
  ) => void;
  onaddnode: (id: string | number, node: JQuery, sender: JQuery.Event) => void;
  onremovenode: (
    id: string | number,
    node: JQuery,
    sender: JQuery.Event
  ) => void;
  onnodecheckselected: (
    id: string | number,
    node: JQuery,
    sender: JQuery.Event
  ) => void;
}

export interface JsonNode {
  id: string | number;
  name: string;
  parentId: string | number;
  href?: string;
  target?: string;
  tooltip?: string;
  buttoncheck?: boolean;
  buttonadd?: boolean;
  buttonremove?: boolean;
  isdisabled?: boolean;
  ischecked?: boolean;
  classnodeicon?: string;
  [key: string]: unknown;
}

export interface JsonDataset {
  root: JsonNode[];
}

export interface XmlDataset {
  find: (selector: string) => JQuery;
}
