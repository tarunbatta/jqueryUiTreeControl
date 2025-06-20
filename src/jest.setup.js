// Jest setup file for jQuery UI Tree Control tests

// Mock jQuery for testing
global.$ = global.jQuery = require('jquery');

// Mock jQuery UI
global.jQuery.ui = {};

// Setup DOM environment
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Make jQuery work with jsdom
global.$ = global.jQuery = require('jquery')(global.window);

// Mock DOM elements for testing
document.body.innerHTML = `
  <div id="treeview"></div>
  <div id="test-container"></div>
`;

// Global test utilities
global.$treedatatype = {
  Json: 1,
  Xml: 2,
};

global.$treedataformat = {
  Linear: 1,
  Hierarchy: 2,
};
