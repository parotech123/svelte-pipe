import { createIDEFriendlyPipePreprocessor } from '../dist/pipe-preprocessor.js';

// Test the preprocessor
const preprocessor = createIDEFriendlyPipePreprocessor({
  pipePrefix: 'utils.',
  debug: true
});

// Test input
const testInput = `
<script>
  let price = 29.99;
  let text = "hello world";
</script>

<p>Price: {price | formatCurrency}</p>
<p>Text: {text | toUpperCase}</p>
<p>Complex: {price | formatCurrency:'EUR' | toUpperCase}</p>
`;

console.log('Testing pipe preprocessor...');

// Process the input
const result = preprocessor.markup({
  content: testInput,
  filename: 'test.svelte'
});

console.log('\n=== ORIGINAL INPUT ===');
console.log(testInput);
console.log('\n=== TRANSFORMED OUTPUT ===');
console.log(result.code);
console.log('\n=== TEST COMPLETE ==='); 