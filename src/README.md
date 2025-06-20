# jQuery UI Tree Control - TypeScript Version

This is the TypeScript migration of the jQuery UI Tree Control plugin. The codebase has been refactored into smaller, more maintainable modules with full TypeScript support.

## Project Structure

```
src/
├── types/
│   ├── index.ts              # Type definitions and interfaces
│   └── global.d.ts           # Global jQuery type extensions
├── utils/
│   ├── defaults.ts           # Default settings configuration
│   ├── dataLoader.ts         # AJAX data loading utilities
│   ├── dataConverter.ts      # Data conversion (JSON/XML)
│   ├── treeRenderer.ts       # HTML tree rendering
│   ├── eventHandlers.ts      # Event handling for interactions
│   └── treeOperations.ts     # Tree operations (expand/collapse)
├── TreeControl.ts            # Main tree control class
├── index.ts                  # jQuery plugin entry point
└── __tests__/
    └── tree-control.test.ts  # TypeScript tests
```

## Key Improvements

### 1. **TypeScript Support**
- Full type safety with strict TypeScript configuration
- Comprehensive type definitions for all interfaces
- Better IDE support and IntelliSense

### 2. **Modular Architecture**
- Separated concerns into focused utility classes
- Better testability and maintainability
- Clear separation of data, rendering, and event handling

### 3. **Modern JavaScript Features**
- ES2020+ features with proper TypeScript compilation
- Async/await for data loading
- Modern class-based architecture

### 4. **Enhanced Developer Experience**
- ESLint configuration for TypeScript
- Prettier code formatting
- Jest testing with TypeScript support
- Source maps for debugging

## Usage

### Basic Usage
```typescript
$('#tree-container').btechcotree({
  datatype: TreeDataType.Json,
  dataformat: TreeDataFormat.Hierarchy,
  dataset: {
    root: [
      {
        id: '1',
        name: 'Root Node',
        parentId: 0,
        childnodes: []
      }
    ]
  }
});
```

### Advanced Configuration
```typescript
$('#tree-container').btechcotree({
  url: '/api/tree-data',
  async: true,
  datatype: TreeDataType.Json,
  dataformat: TreeDataFormat.Linear,
  show_button_check: true,
  show_button_add: true,
  show_button_remove: true,
  collapse_tree: false,
  onselectednode: (id, node, event) => {
    console.log('Selected node:', id);
  },
  onaddnode: (id, node, event) => {
    console.log('Add node:', id);
  }
});
```

## Development

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
npm install
```

### Build
```bash
# Build TypeScript and webpack bundle
npm run build

# Development build with source maps
npm run build:webpack:dev
```

### Testing
```bash
# Run tests
npm test

# Watch mode
npm run test:watch
```

### Linting and Formatting
```bash
# Lint TypeScript files
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## API Reference

### TreeControl Class
The main class that orchestrates all tree operations.

#### Methods
- `initialize()`: Initialize the tree control
- `getRootNodes()`: Get root nodes of the tree
- `expand()`: Expand all nodes
- `collapse()`: Collapse all nodes
- `toggle()`: Toggle tree state

### Static Methods
- `$.fn.btechcotree.GetRootNodes()`: Get root nodes
- `$.fn.btechcotree.Expand()`: Expand tree
- `$.fn.btechcotree.Collapse()`: Collapse tree
- `$.fn.btechcotree.Toggle()`: Toggle tree

## Migration Notes

### From JavaScript Version
- All functionality preserved
- Same jQuery plugin interface
- Backward compatible API
- Enhanced type safety

### Breaking Changes
- None - fully backward compatible
- Enhanced error handling
- Better performance with modern JavaScript

## License

MIT License - see LICENSE.txt for details. 