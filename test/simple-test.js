import { createIDEFriendlyPipePreprocessor } from '../dist/pipe-preprocessor.js';

console.log('🧪 Testing Svelte Pipe Preprocessor...\n');

// Test the preprocessor
const preprocessor = createIDEFriendlyPipePreprocessor({
  pipePrefix: 'utils.',
  debug: false // Disable debug to reduce output
});

// Simple test input
const testInput = `
<p>Price: {price | formatCurrency}</p>
<p>Text: {text | toUpperCase}</p>
`;

// Process the input
const result = preprocessor.markup({
  content: testInput,
  filename: 'test.svelte'
});

// Check if transformation worked
const hasTransformation = result.code.includes('utils.formatCurrency') || result.code.includes('utils.toUpperCase');

console.log('✅ Preprocessor loaded successfully');
console.log('✅ Input processed successfully');
console.log(`✅ Transformation ${hasTransformation ? 'WORKED' : 'FAILED'}`);

if (hasTransformation) {
  console.log('🎉 All tests passed!');
} else {
  console.log('❌ Transformation failed');
  console.log('Original:', testInput);
  console.log('Result:', result.code);
} 