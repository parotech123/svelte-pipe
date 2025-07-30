# Svelte Pipe Preprocessor

A Svelte preprocessor that adds pipe syntax support to Svelte templates, allowing you to chain functions in a more readable way.

## Installation

```bash
npm install svelte-pipe-preprocessor
```

## Usage

### Basic Setup

Add the preprocessor to your Svelte configuration:

```javascript
// svelte.config.js
import { createIDEFriendlyPipePreprocessor } from 'svelte-pipe-preprocessor';

export default {
  preprocess: [
    createIDEFriendlyPipePreprocessor({
      pipePrefix: 'utils.', // Optional: prefix for pipe functions
      debug: false, // Optional: enable debug logging
      ideMode: true, // Optional: enable IDE-friendly mode for better IntelliSense
      suppressIDEWarnings: true // Optional: suppress TypeScript warnings for pipe syntax
    })
  ]
};
```

### Using Pipes in Svelte Templates

The preprocessor allows you to use pipe syntax in your Svelte templates:

```svelte
<script>
  import { formatCurrency, toUpperCase, truncate } from './utils.js';
  
  let price = 29.99;
  let text = "hello world";
  let longText = "This is a very long text that needs to be truncated";
</script>

<!-- Basic pipe usage -->
<p>Price: {price | formatCurrency}</p>

<!-- Pipe with arguments -->
<p>Text: {text | toUpperCase}</p>

<!-- Multiple pipes chained -->
<p>Long text: {longText | truncate:20 | toUpperCase}</p>

<!-- Pipes with complex arguments -->
<p>Formatted: {price | formatCurrency:'USD' | toUpperCase}</p>
```

## Creating Custom Pipes

### Basic Pipe Function Structure

All pipe functions follow a simple pattern: they accept the value as the first parameter and return the transformed value.

```javascript
// Basic pipe function
function myPipe(value, ...args) {
  // Transform the value
  return transformedValue;
}
```

### String Pipes

```javascript
// utils/string-pipes.js
export function capitalize(value) {
  if (typeof value !== 'string') return value;
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export function truncate(value, length = 50) {
  if (typeof value !== 'string') return value;
  return value.length > length ? value.substring(0, length) + '...' : value;
}

export function reverse(value) {
  if (typeof value !== 'string') return value;
  return value.split('').reverse().join('');
}

export function slugify(value) {
  if (typeof value !== 'string') return value;
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
```

### Number Pipes

```javascript
// utils/number-pipes.js
export function formatCurrency(value, currency = 'USD') {
  if (typeof value !== 'number') return value;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(value);
}

export function round(value, decimals = 0) {
  if (typeof value !== 'number') return value;
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export function percentage(value, decimals = 1) {
  if (typeof value !== 'number') return value;
  return `${(value * 100).toFixed(decimals)}%`;
}

export function formatNumber(value, locale = 'en-US') {
  if (typeof value !== 'number') return value;
  return new Intl.NumberFormat(locale).format(value);
}
```

### Array Pipes

```javascript
// utils/array-pipes.js
export function filter(array, predicate) {
  if (!Array.isArray(array)) return array;
  return array.filter(predicate);
}

export function map(array, transform) {
  if (!Array.isArray(array)) return array;
  return array.map(transform);
}

export function slice(array, start, end) {
  if (!Array.isArray(array)) return array;
  return array.slice(start, end);
}

export function sort(array, compareFn) {
  if (!Array.isArray(array)) return array;
  return [...array].sort(compareFn);
}

export function unique(array) {
  if (!Array.isArray(array)) return array;
  return [...new Set(array)];
}
```

### Date Pipes

```javascript
// utils/date-pipes.js
export function formatDate(value, format = 'short') {
  if (!(value instanceof Date)) return value;
  
  const options = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
    time: { hour: '2-digit', minute: '2-digit' }
  };
  
  return new Intl.DateTimeFormat('en-US', options[format] || options.short).format(value);
}

export function relativeTime(value) {
  if (!(value instanceof Date)) return value;
  
  const now = new Date();
  const diff = now - value;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days === 1 ? '' : 's'} ago`;
  if (hours > 0) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  if (minutes > 0) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  return 'Just now';
}
```

### Object Pipes

```javascript
// utils/object-pipes.js
export function pick(obj, keys) {
  if (typeof obj !== 'object' || obj === null) return obj;
  const result = {};
  keys.forEach(key => {
    if (key in obj) result[key] = obj[key];
  });
  return result;
}

export function omit(obj, keys) {
  if (typeof obj !== 'object' || obj === null) return obj;
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
}

export function keys(obj) {
  if (typeof obj !== 'object' || obj === null) return [];
  return Object.keys(obj);
}

export function values(obj) {
  if (typeof obj !== 'object' || obj === null) return [];
  return Object.values(obj);
}
```

### Advanced Custom Pipes

#### Pipe with Multiple Arguments

```javascript
// utils/advanced-pipes.js
export function replace(value, searchValue, replaceValue) {
  if (typeof value !== 'string') return value;
  return value.replace(searchValue, replaceValue);
}

export function padStart(value, length, char = ' ') {
  return String(value).padStart(length, char);
}

export function formatPhone(value, format = 'standard') {
  if (typeof value !== 'string') return value;
  
  const cleaned = value.replace(/\D/g, '');
  
  if (format === 'standard') {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  
  return cleaned;
}
```

#### Pipe with Complex Logic

```javascript
// utils/complex-pipes.js
export function conditional(value, condition, trueValue, falseValue) {
  return condition ? trueValue : falseValue;
}

export function safe(value, fallback = '') {
  return value ?? fallback;
}

export function limit(value, min, max) {
  if (typeof value !== 'number') return value;
  return Math.min(Math.max(value, min), max);
}

export function interpolate(template, data) {
  if (typeof template !== 'string') return template;
  return template.replace(/\{(\w+)\}/g, (match, key) => data[key] || match);
}
```

### Using Custom Pipes in Templates

```svelte
<script>
  import { capitalize, truncate, formatCurrency } from './utils/string-pipes.js';
  import { formatDate, relativeTime } from './utils/date-pipes.js';
  import { filter, map } from './utils/array-pipes.js';
  
  let user = { name: 'john doe', email: 'john@example.com' };
  let posts = [
    { title: 'First Post', date: new Date('2024-01-01') },
    { title: 'Second Post', date: new Date('2024-01-15') }
  ];
</script>

<!-- String transformations -->
<p>Name: {user.name | capitalize}</p>
<p>Email: {user.email | truncate:20}</p>

<!-- Date formatting -->
<p>Posted: {posts[0].date | formatDate:'long'}</p>
<p>Time ago: {posts[0].date | relativeTime}</p>

<!-- Array operations -->
<p>Recent posts: {posts | filter:post => post.date > new Date('2024-01-10') | map:post => post.title}</p>

<!-- Complex transformations -->
<p>Formatted: {user.name | capitalize | truncate:10}</p>
```

### Pipe Function Best Practices

1. **Always handle different input types**
   ```javascript
   function myPipe(value, ...args) {
     if (typeof value !== 'string') return value;
     // Your logic here
   }
   ```

2. **Provide sensible defaults**
   ```javascript
   function truncate(value, length = 50) {
     // Default length if not provided
   }
   ```

3. **Make pipes pure functions**
   ```javascript
   // Good - pure function
   function toUpperCase(value) {
     return String(value).toUpperCase();
   }
   
   // Avoid - side effects
   function badPipe(value) {
     console.log(value); // Side effect
     return value;
   }
   ```

4. **Use descriptive names**
   ```javascript
   // Good
   function formatCurrency(value) { }
   function slugify(value) { }
   
   // Avoid
   function format(value) { }
   function transform(value) { }
   ```

5. **Group related pipes**
   ```javascript
   // utils/string-pipes.js
   export function toUpperCase(value) { }
   export function toLowerCase(value) { }
   export function capitalize(value) { }
   
   // utils/number-pipes.js
   export function formatCurrency(value) { }
   export function round(value) { }
   ```

### TypeScript Support for Custom Pipes

For better TypeScript support, you can create type definitions for your custom pipes:

```typescript
// types/custom-pipes.d.ts
declare global {
  // String pipes
  function capitalize(value: string): string;
  function truncate(value: string, length?: number): string;
  
  // Number pipes
  function formatCurrency(value: number, currency?: string): string;
  function round(value: number, decimals?: number): number;
  
  // Array pipes
  function filter<T>(array: T[], predicate: (item: T) => boolean): T[];
  function map<T, U>(array: T[], transform: (item: T) => U): U[];
}

export {};
```

### Pipe Functions

Your pipe functions should accept the value as the first parameter:

```javascript
// utils.js
export function formatCurrency(value, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(value);
}

export function toUpperCase(value) {
  return String(value).toUpperCase();
}

export function truncate(value, length = 50) {
  const str = String(value);
  return str.length > length ? str.substring(0, length) + '...' : str;
}
```

## Configuration Options

### `pipePrefix` (string, optional)
A prefix to add to all pipe function names. Useful for namespacing your pipe functions.

```javascript
createIDEFriendlyPipePreprocessor({
  pipePrefix: 'utils.'
})
```

### `debug` (boolean, optional)
Enable debug logging to see how pipes are being transformed.

```javascript
createIDEFriendlyPipePreprocessor({
  debug: true
})
```

### `ideMode` (boolean, optional)
Enable IDE-friendly mode for better IntelliSense support. Defaults to `true` in development.

```javascript
createIDEFriendlyPipePreprocessor({
  ideMode: process.env.NODE_ENV === 'development'
})
```

### `suppressIDEWarnings` (boolean, optional)
Suppress TypeScript warnings for pipe syntax in IDE mode. Defaults to `true`.

```javascript
createIDEFriendlyPipePreprocessor({
  suppressIDEWarnings: true
})
```

## Troubleshooting IDE Errors

### TypeScript/ESLint Errors

If you're seeing errors about pipe syntax in your IDE, try these solutions:

1. **Enable IDE mode** in your preprocessor configuration:
```javascript
createIDEFriendlyPipePreprocessor({
  ideMode: true,
  suppressIDEWarnings: true
})
```

2. **Add ESLint configuration** to ignore pipe syntax errors:
```javascript
// .eslintrc.cjs
module.exports = {
  overrides: [
    {
      files: ['*.svelte'],
      rules: {
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 'off'
      }
    }
  ]
};
```

3. **Use VS Code settings** for better Svelte support:
```json
// .vscode/settings.json
{
  "svelte.enable-ts-plugin": true,
  "svelte.plugin.svelte.defaultScriptLanguage": "ts"
}
```

### Common Issues

- **"Cannot find name 'functionName'"**: Make sure your pipe functions are imported in the script section
- **"Unexpected token '|'"**: This is expected - the preprocessor transforms this syntax
- **TypeScript errors**: Use `suppressIDEWarnings: true` or add `// @ts-ignore` comments

## How It Works

The preprocessor transforms pipe syntax like this:

```svelte
{value | function1 | function2:arg1,arg2}
```

Into standard JavaScript function calls:

```javascript
{function2(function1(value), arg1, arg2)}
```

## Examples

### Simple Transformation
```svelte
{name | toUpperCase}
```
Becomes:
```javascript
{toUpperCase(name)}
```

### Chained Pipes
```svelte
{text | trim | toLowerCase | capitalize}
```
Becomes:
```javascript
{capitalize(toLowerCase(trim(text)))}
```

### Pipes with Arguments
```svelte
{price | formatCurrency:'EUR' | toUpperCase}
```
Becomes:
```javascript
{toUpperCase(formatCurrency(price, 'EUR'))}
```

## TypeScript Support

The package includes TypeScript definitions and is written in TypeScript for better type safety.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
