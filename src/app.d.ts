// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	function uppercase(value: any): string;
	function lowercase(value: any): string;
	function currency(value: number, currency?: string, showSymbol?: boolean): string;
	function date(value: Date | string | number, format?: 'short' | 'medium' | 'long' | 'full'): string;
	function json(value: any, space?: number): string;
	function slice<T>(array: T[], start: number, end?: number): T[];
	function filter<T>(array: T[], predicate: string | ((item: T) => boolean)): T[];
}

export {};
