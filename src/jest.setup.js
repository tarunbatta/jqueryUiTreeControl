// Jest setup file for jQuery UI Tree Control tests
global.$ = global.jQuery = require('jquery');
require('jquery-ui');

// Mock DOM elements for testing
document.body.innerHTML = `
  <div id="treeview"></div>
  <div id="test-container"></div>
`;

// Global test utilities
global.$treedatatype = {
  Json: 1,
  Xml: 2
};

global.$treedataformat = {
  Linear: 1,
  Hierarchy: 2
}; 