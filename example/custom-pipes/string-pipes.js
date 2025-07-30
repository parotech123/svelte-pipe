// Example string pipe functions
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

export function toUpperCase(value) {
  return String(value).toUpperCase();
}

export function toLowerCase(value) {
  return String(value).toLowerCase();
} 