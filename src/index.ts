/*
 * jQuery UI Treeview Plugin Library
 * http://techbytarun.com/
 *
 * Copyright (c) 2013 Batta Tech Private Limited
 * Licensed under https://github.com/tarunbatta/jqueryUiTreeControl/blob/master/LICENSE.txt
 */

import { TreeControl } from './TreeControl';
import { TreeSettings } from './types';

// Store instances for static methods
const treeInstances = new Map<string, TreeControl>();

// jQuery plugin definition
$.fn.btechcotree = function (options: Partial<TreeSettings> = {}): JQuery {
  return this.each(function () {
    const $element = $(this);
    const containerId = $element.attr('id');

    if (!containerId) {
      console.error('Tree control requires an element with an ID');
      return;
    }

    // Merge options with container ID
    const mergedOptions = { ...options, containerid: containerId };

    // Create and initialize tree control
    const treeControl = new TreeControl(mergedOptions);
    treeInstances.set(containerId, treeControl);

    // Initialize the tree
    treeControl.initialize().catch((error) => {
      console.error('Failed to initialize tree control:', error);
    });
  });
};

// Static methods
const pluginAny = $.fn.btechcotree as any;
pluginAny.GetRootNodes = function (): JQuery {
  const firstInstance = Array.from(treeInstances.values())[0];
  return firstInstance ? firstInstance.getRootNodes() : $();
};
pluginAny.ToggleTree = function (selectedNode: JQuery): void {
  const firstInstance = Array.from(treeInstances.values())[0];
  if (firstInstance) {
    firstInstance.toggleTree(selectedNode);
  }
};
pluginAny.ToggleCaratIcon = function (selectedNode: JQuery): void {
  const firstInstance = Array.from(treeInstances.values())[0];
  if (firstInstance) {
    firstInstance.toggleCaratIcon(selectedNode);
  }
};
pluginAny.ExpandCollapseTree = function (
  selectedNode: JQuery,
  flag: boolean
): void {
  const firstInstance = Array.from(treeInstances.values())[0];
  if (firstInstance) {
    firstInstance.expandCollapseTree(selectedNode, flag);
  }
};
pluginAny.Expand = function (): void {
  const firstInstance = Array.from(treeInstances.values())[0];
  if (firstInstance) {
    firstInstance.expand();
  }
};
pluginAny.Collapse = function (): void {
  const firstInstance = Array.from(treeInstances.values())[0];
  if (firstInstance) {
    firstInstance.collapse();
  }
};
pluginAny.Toggle = function (): void {
  const firstInstance = Array.from(treeInstances.values())[0];
  if (firstInstance) {
    firstInstance.toggle();
  }
};

// Export for module usage
export { TreeControl };
export * from './types';
