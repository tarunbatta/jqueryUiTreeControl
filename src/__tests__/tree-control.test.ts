import $ from 'jquery';
(global as any).$ = $;
(global as any).jQuery = $;
import '../index';
import { TreeControl } from '../TreeControl';
import { TreeDataType, TreeDataFormat } from '../types';

describe('TreeControl', () => {
  let container: HTMLElement;
  let treeControl: TreeControl;

  beforeEach(() => {
    // Setup DOM
    container = document.createElement('div');
    container.id = 'test-tree';
    document.body.appendChild(container);

    // Create tree control instance
    treeControl = new TreeControl({
      containerid: 'test-tree',
      datatype: TreeDataType.Json,
      dataformat: TreeDataFormat.Hierarchy,
      dataset: {
        root: [
          {
            id: '1',
            name: 'Root Node',
            parentId: 0,
            childnodes: [
              {
                id: '2',
                name: 'Child Node',
                parentId: '1',
                childnodes: [],
              },
            ],
          },
        ],
      },
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('initialization', () => {
    it('should create a tree control instance', () => {
      expect(treeControl).toBeInstanceOf(TreeControl);
    });

    it('should have default settings', () => {
      expect(treeControl).toBeDefined();
    });
  });

  describe('tree operations', () => {
    beforeEach(async () => {
      await treeControl.initialize();
    });

    it('should get root nodes', () => {
      const rootNodes = treeControl.getRootNodes();
      expect(rootNodes).toBeDefined();
    });

    it('should expand tree', () => {
      expect(() => treeControl.expand()).not.toThrow();
    });

    it('should collapse tree', () => {
      expect(() => treeControl.collapse()).not.toThrow();
    });

    it('should toggle tree', () => {
      expect(() => treeControl.toggle()).not.toThrow();
    });
  });

  describe('jQuery plugin', () => {
    it('should extend jQuery with btechcotree method', () => {
      expect($.fn.btechcotree).toBeDefined();
      expect(typeof $.fn.btechcotree).toBe('function');
    });

    it('should have static methods', () => {
      expect($.fn.btechcotree.GetRootNodes).toBeDefined();
      expect($.fn.btechcotree.Expand).toBeDefined();
      expect($.fn.btechcotree.Collapse).toBeDefined();
      expect($.fn.btechcotree.Toggle).toBeDefined();
    });
  });
});
