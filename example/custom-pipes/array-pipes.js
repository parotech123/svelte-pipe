// Example array pipe functions
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

export function join(array, separator = ', ') {
  if (!Array.isArray(array)) return array;
  return array.join(separator);
}

export function length(array) {
  if (!Array.isArray(array)) return 0;
  return array.length;
} 