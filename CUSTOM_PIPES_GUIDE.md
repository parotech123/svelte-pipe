# Custom Pipes Quick Reference Guide

This guide provides quick examples and patterns for creating custom pipes with the Svelte Pipe Preprocessor.

## Basic Pipe Function Pattern

```javascript
function myPipe(value, ...args) {
  // Handle different input types
  if (typeof value !== 'expectedType') return value;
  
  // Transform the value
  return transformedValue;
}
```

## Common Pipe Categories

### String Pipes
```javascript
// Text transformation
function capitalize(value) {
  if (typeof value !== 'string') return value;
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

// Text formatting
function truncate(value, length = 50) {
  if (typeof value !== 'string') return value;
  return value.length > length ? value.substring(0, length) + '...' : value;
}

// Text manipulation
function slugify(value) {
  if (typeof value !== 'string') return value;
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
```

### Number Pipes
```javascript
// Currency formatting
function formatCurrency(value, currency = 'USD') {
  if (typeof value !== 'number') return value;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(value);
}

// Number formatting
function round(value, decimals = 0) {
  if (typeof value !== 'number') return value;
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
```

### Array Pipes
```javascript
// Array filtering
function filter(array, predicate) {
  if (!Array.isArray(array)) return array;
  return array.filter(predicate);
}

// Array transformation
function map(array, transform) {
  if (!Array.isArray(array)) return array;
  return array.map(transform);
}

// Array utilities
function unique(array) {
  if (!Array.isArray(array)) return array;
  return [...new Set(array)];
}
```

### Date Pipes
```javascript
// Date formatting
function formatDate(value, format = 'short') {
  if (!(value instanceof Date)) return value;
  const options = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
  };
  return new Intl.DateTimeFormat('en-US', options[format]).format(value);
}

// Relative time
function relativeTime(value) {
  if (!(value instanceof Date)) return value;
  const now = new Date();
  const diff = now - value;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return `${days} day${days === 1 ? '' : 's'} ago`;
}
```

## Advanced Patterns

### Conditional Pipes
```javascript
function conditional(value, condition, trueValue, falseValue) {
  return condition ? trueValue : falseValue;
}

function safe(value, fallback = '') {
  return value ?? fallback;
}
```

### Validation Pipes
```javascript
function validate(value, validator) {
  return validator(value) ? value : null;
}

function required(value) {
  return value != null && value !== '' ? value : null;
}
```

### Transformation Pipes
```javascript
function interpolate(template, data) {
  if (typeof template !== 'string') return template;
  return template.replace(/\{(\w+)\}/g, (match, key) => data[key] || match);
}

function replace(value, searchValue, replaceValue) {
  if (typeof value !== 'string') return value;
  return value.replace(searchValue, replaceValue);
}
```

## Best Practices

### 1. Type Safety
```javascript
// Good
function capitalize(value) {
  if (typeof value !== 'string') return value;
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

// Avoid
function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}
```

### 2. Default Values
```javascript
// Good
function truncate(value, length = 50) {
  return value.length > length ? value.substring(0, length) + '...' : value;
}

// Avoid
function truncate(value, length) {
  return value.length > length ? value.substring(0, length) + '...' : value;
}
```

### 3. Pure Functions
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

### 4. Descriptive Names
```javascript
// Good
function formatCurrency(value) { }
function slugify(value) { }

// Avoid
function format(value) { }
function transform(value) { }
```

## File Organization

### Group Related Pipes
```
utils/
├── string-pipes.js
├── number-pipes.js
├── array-pipes.js
├── date-pipes.js
└── validation-pipes.js
```

### Example Structure
```javascript
// utils/string-pipes.js
export function capitalize(value) { }
export function truncate(value, length = 50) { }
export function slugify(value) { }

// utils/number-pipes.js
export function formatCurrency(value, currency = 'USD') { }
export function round(value, decimals = 0) { }
export function percentage(value, decimals = 1) { }
```

## TypeScript Support

### Type Definitions
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

## Usage Examples

### In Svelte Templates
```svelte
<script>
  import { capitalize, formatCurrency } from './utils/string-pipes.js';
</script>

<p>Name: {user.name | capitalize}</p>
<p>Price: {price | formatCurrency:'EUR'}</p>
```

### Chaining Pipes
```svelte
<p>Formatted: {user.name | capitalize | truncate:10}</p>
<p>Complex: {price | formatCurrency | toUpperCase}</p>
```

### With Arguments
```svelte
<p>Truncated: {text | truncate:20}</p>
<p>Currency: {price | formatCurrency:'USD'}</p>
```

## Testing Custom Pipes

### Unit Tests
```javascript
// test/string-pipes.test.js
import { capitalize, truncate } from '../utils/string-pipes.js';

describe('String Pipes', () => {
  test('capitalize should capitalize first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('WORLD')).toBe('World');
  });
  
  test('truncate should truncate long strings', () => {
    expect(truncate('Hello World', 5)).toBe('Hello...');
  });
});
```

### Integration Tests
```javascript
// test/pipe-preprocessor.test.js
import { createIDEFriendlyPipePreprocessor } from '../dist/pipe-preprocessor.js';

const preprocessor = createIDEFriendlyPipePreprocessor();

test('should transform pipe syntax', () => {
  const input = '<p>{name | capitalize}</p>';
  const result = preprocessor.markup({ content: input, filename: 'test.svelte' });
  
  expect(result.code).toContain('capitalize(name)');
});
```

This guide provides the essential patterns and examples for creating custom pipes that work seamlessly with the Svelte Pipe Preprocessor! 