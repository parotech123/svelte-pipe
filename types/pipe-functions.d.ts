// Type definitions for common pipe functions
// This helps IDEs understand pipe function signatures

declare global {
  // String pipe functions
  function toUpperCase(value: string): string;
  function toLowerCase(value: string): string;
  function capitalize(value: string): string;
  function truncate(value: string, length?: number): string;
  function reverse(value: string): string;
  function padStart(value: string | number, length: number, char?: string): string;
  function padEnd(value: string | number, length: number, char?: string): string;
  
  // Number pipe functions
  function formatCurrency(value: number, currency?: string): string;
  function formatNumber(value: number, options?: Intl.NumberFormatOptions): string;
  function round(value: number, decimals?: number): number;
  function floor(value: number): number;
  function ceil(value: number): number;
  
  // Array pipe functions
  function filter<T>(array: T[], predicate: (item: T) => boolean): T[];
  function map<T, U>(array: T[], transform: (item: T) => U): U[];
  function slice<T>(array: T[], start?: number, end?: number): T[];
  function sort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[];
  function reverse<T>(array: T[]): T[];
  
  // Date pipe functions
  function formatDate(value: Date, format?: string): string;
  function formatRelativeTime(value: Date): string;
  
  // Utility pipe functions
  function json(value: any): string;
  function stringify(value: any): string;
  function parse(value: string): any;
}

export {}; 