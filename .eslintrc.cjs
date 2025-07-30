module.exports = {
  root: true,
  extends: [
    '@sveltejs/eslint-config-prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte']
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      rules: {
        // Disable rules that conflict with pipe syntax
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        // Allow pipe syntax in templates
        'svelte/valid-compile': 'off'
      }
    }
  ],
  rules: {
    // Add custom rules for pipe syntax if needed
    'no-undef': 'off' // Pipe functions will be defined at runtime
  }
}; 