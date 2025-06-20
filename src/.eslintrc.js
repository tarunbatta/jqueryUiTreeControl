module.exports = {
  env: {
    browser: true,
    es2021: true,
    jquery: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['jquery'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'script',
  },
  globals: {
    $: 'readonly',
    jQuery: 'readonly',
    $treedatatype: 'writable',
    $treedataformat: 'writable',
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'no-debugger': 'warn',
    'prefer-const': 'warn',
    'no-var': 'off',
    'object-shorthand': 'off',
    'prefer-template': 'off',
    'no-prototype-builtins': 'off',
    'no-global-assign': 'off',
  },
};
