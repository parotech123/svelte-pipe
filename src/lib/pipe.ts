
export function uppercase(value: string) {
	return String(value).toUpperCase();
}

export function lowercase(value: string) {
	return String(value).toLowerCase();
}

export function currency(value: number, currency = 'USD', showSymbol = true) {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currency
	});
	const formatted = formatter.format(value);
	return showSymbol ? formatted : formatted.replace(/[^0-9.,]/g, '');
}

export function date(value: Date | string | number, format: 'short' | 'full' | 'long' | 'medium' = 'short') {
	return new Date(value).toLocaleDateString('en-US', {
		dateStyle: format
	});
}

export function json(value: any, space = 2) {
	return JSON.stringify(value, null, space);
}

export function slice(array: any[], start: number, end?: number) {
	return array.slice(start, end);
}

export function addZeroPadding(value: number, length: number) {
	return value.toString().padStart(length, '0');
}

export function filter(array: any[], predicate: string | ((item: any) => boolean)) {
	if (typeof predicate === 'string') {
		return array.filter(item =>
			String(item).toLowerCase().includes(predicate.toLowerCase())
		);
	}
	return array.filter(predicate);
}

// Export all pipes as a single object for convenience
export const pipes = {
	uppercase,
	lowercase,
	currency,
	date,
	json,
	slice,
	filter
};