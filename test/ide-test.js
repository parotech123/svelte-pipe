import { createIDEFriendlyPipePreprocessor } from '../dist/pipe-preprocessor.js';

console.log('🧪 Testing IDE Mode with Suppress Warnings...\n');

// Test the preprocessor with IDE mode and suppress warnings
const preprocessor = createIDEFriendlyPipePreprocessor({
  pipePrefix: 'utils.',
  debug: false,
  ideMode: true,
  suppressIDEWarnings: true
});

// Test input
const testInput = `
<p>Price: {price | formatCurrency}</p>
<p>Text: {text | toUpperCase}</p>
`;

// Process the input
const result = preprocessor.markup({
  content: testInput,
  filename: 'test.svelte'
});

// Check if @ts-ignore comments were added
const hasTsIgnore = result.code.includes('@ts-ignore');

console.log('✅ IDE mode preprocessor loaded successfully');
console.log('✅ Input processed successfully');
console.log(`✅ @ts-ignore comments ${hasTsIgnore ? 'ADDED' : 'NOT ADDED'}`);

if (hasTsIgnore) {
  console.log('🎉 IDE mode with suppress warnings working correctly!');
} else {
  console.log('❌ @ts-ignore comments not found');
  console.log('Result:', result.code);
} 