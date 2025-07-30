// Example date pipe functions
export function formatDate(value, format = 'short') {
  if (!(value instanceof Date)) return value;
  
  const options = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
    time: { hour: '2-digit', minute: '2-digit' },
    full: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit' }
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

export function isToday(value) {
  if (!(value instanceof Date)) return false;
  const today = new Date();
  return value.toDateString() === today.toDateString();
}

export function isYesterday(value) {
  if (!(value instanceof Date)) return false;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return value.toDateString() === yesterday.toDateString();
} 