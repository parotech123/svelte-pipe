// Example number pipe functions
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

export function padStart(value, length, char = '0') {
  return String(value).padStart(length, char);
} 