# Build System Migration

This project has been migrated from Grunt + Bower to modern npm-based tooling.

## What Changed

### Before (Grunt + Bower)
- **Grunt**: Used for minification and file copying
- **Bower**: Used for managing jQuery UI dependencies
- **Gruntfile.js**: Complex configuration file
- **bower.json**: Separate dependency management

### After (npm only)
- **npm scripts**: Simple, readable build commands
- **npm dependencies**: All dependencies managed in one place
- **uglify-js**: Direct minification tool
- **webpack**: Optional modern bundler

## Available Commands

### Basic Build (uglify-js)
```bash
npm run build          # Build and copy files
npm run uglify         # Minify only
npm run copy           # Copy unminified to dist
npm run copy-min       # Copy minified to dist
npm run watch          # Watch for changes and rebuild
npm run clean          # Clean generated files
```

### Webpack Build (recommended)
```bash
npm run build:webpack      # Production build with webpack
npm run build:webpack:dev  # Development build
npm run watch:webpack      # Watch with webpack
```

### Development
```bash
npm run dev               # Start development with uglify-js
npm run dev:webpack       # Start development with webpack
```

## Benefits of Migration

1. **Simplified Setup**: No need for Grunt or Bower
2. **Better Performance**: Webpack provides better optimization
3. **Modern Tooling**: Uses current industry standards
4. **Single Package Manager**: Everything managed through npm
5. **Better Source Maps**: Improved debugging experience
6. **Tree Shaking**: Webpack can eliminate unused code
7. **Hot Reloading**: Faster development cycles

## File Structure

```
src/
├── package.json          # All dependencies and scripts
├── webpack.config.js     # Webpack configuration (optional)
├── Scripts/
│   └── jquery.techbytarun.jqueryuitreecontrol.js
└── dist/                 # Output directory
    ├── jquery.techbytarun.jqueryuitreecontrol.js
    └── jquery.techbytarun.jqueryuitreecontrol.min.js
```

## Migration Notes

- **jQuery UI**: Now managed through npm instead of Bower
- **Dependencies**: All moved to package.json
- **Build Process**: Simplified and faster
- **Compatibility**: Maintains same output format 