export function formatCurrency(value, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(value);
}

export function toUpperCase(value) {
  return String(value).toUpperCase();
}

export function toLowerCase(value) {
  return String(value).toLowerCase();
}

export function capitalize(value) {
  const str = String(value);
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(value, length = 50) {
  const str = String(value);
  return str.length > length ? str.substring(0, length) + '...' : str;
}

export function reverse(value) {
  return String(value).split('').reverse().join('');
}

export function padStart(value, length, char = '0') {
  return String(value).padStart(length, char);
}

export function padEnd(value, length, char = ' ') {
  return String(value).padEnd(length, char);
} 