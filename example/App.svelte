<script>
  import { formatCurrency, toUpperCase, toLowerCase, capitalize, truncate, reverse, padStart, padEnd } from './utils.js';
  
  let price = 29.99;
  let text = "hello world";
  let longText = "This is a very long text that needs to be truncated";
  let number = 42;
</script>

<main>
  <h1>Svelte Pipe Preprocessor Example</h1>
  
  <section>
    <h2>Basic Pipes</h2>
    <p>Original price: {price}</p>
    <p>Formatted price: {price | formatCurrency}</p>
    <p>Uppercase text: {text | toUpperCase}</p>
    <p>Lowercase text: {text | toLowerCase}</p>
    <p>Capitalized text: {text | capitalize}</p>
  </section>
  
  <section>
    <h2>Pipes with Arguments</h2>
    <p>Price in EUR: {price | formatCurrency:'EUR'}</p>
    <p>Truncated text: {longText | truncate:20}</p>
    <p>Padded number: {number | padStart:5}</p>
    <p>Padded text: {text | padEnd:15}</p>
  </section>
  
  <section>
    <h2>Chained Pipes</h2>
    <p>Text transformations: {text | toUpperCase | reverse}</p>
    <p>Price transformations: {price | formatCurrency:'USD' | toUpperCase}</p>
    <p>Complex chain: {longText | truncate:15 | toUpperCase | reverse}</p>
  </section>
  
  <section>
    <h2>Interactive Demo</h2>
    <div class="controls">
      <label for="input-text">Input Text:</label>
      <input id="input-text" type="text" bind:value={text} />
      
      <label for="input-price">Price:</label>
      <input id="input-price" type="number" bind:value={price} step="0.01" />
    </div>
    
    <div class="results">
      <p>Original: {text}</p>
      <p>Uppercase: {text | toUpperCase}</p>
      <p>Capitalized: {text | capitalize}</p>
      <p>Price: {price | formatCurrency}</p>
    </div>
  </section>
</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
  }
  
  section {
    margin-bottom: 2rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  h1 {
    color: #333;
    text-align: center;
  }
  
  h2 {
    color: #666;
    border-bottom: 2px solid #eee;
    padding-bottom: 0.5rem;
  }
  
  .controls {
    margin-bottom: 1rem;
  }
  
  .controls label {
    display: inline-block;
    width: 100px;
    margin-right: 1rem;
  }
  
  .controls input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 1rem;
  }
  
  .results p {
    background: #f5f5f5;
    padding: 0.5rem;
    margin: 0.25rem 0;
    border-radius: 4px;
    font-family: monospace;
  }
</style> 