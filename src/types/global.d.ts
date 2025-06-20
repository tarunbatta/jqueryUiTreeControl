import { TreeSettings } from './index';

declare global {
  interface JQuery {
    btechcotree(options?: Partial<TreeSettings>): JQuery;
  }

  interface JQueryStatic {
    fn: {
      btechcotree: {
        GetRootNodes(): JQuery;
        ToggleTree(selectedNode: JQuery): void;
        ToggleCaratIcon(selectedNode: JQuery): void;
        ExpandCollapseTree(selectedNode: JQuery, flag: boolean): void;
        Expand(): void;
        Collapse(): void;
        Toggle(): void;
      };
    };
  }
}

export {};
