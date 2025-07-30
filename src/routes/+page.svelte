<script lang="ts">
  import { uppercase, lowercase, currency, date, json, slice, filter, addZeroPadding } from '$lib/pipe.js';
  
  // Reactive data for testing
  let name = 'john doe';
  let price = 39.99;
  let timestamp = new Date();
  let items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  let searchTerm = '';
  let userData = {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    preferences: ['coding', 'reading', 'music']
  };
  
  // Interactive controls
  let currencyCode = 'USD';
  let showSymbol = true;
  let dateFormat: 'short' | 'full' | 'long' | 'medium' = 'short';
  let sliceStart = 0;
  let sliceEnd = 3;
  let paddingNumber = 42;
  let paddingLength = 5;
  
  // Computed values for demonstration
  $: filteredItems = items.filter(item => 
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );
</script>

<svelte:head>
  <title>Pipe Preprocessor Test</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }
    
    .container {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    
    h1 {
      color: #2c3e50;
      text-align: center;
      margin-bottom: 30px;
      font-size: 2.5em;
    }
    
    .section {
      margin-bottom: 40px;
      padding: 20px;
      border: 1px solid #e1e8ed;
      border-radius: 8px;
      background: #f8f9fa;
    }
    
    .section h2 {
      color: #34495e;
      margin-bottom: 15px;
      font-size: 1.5em;
    }
    
    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .demo-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      border-left: 4px solid #3498db;
    }
    
    .demo-card h3 {
      margin: 0 0 10px 0;
      color: #2c3e50;
      font-size: 1.1em;
    }
    
    .result {
      background: #ecf0f1;
      padding: 10px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      margin: 10px 0;
      border-left: 3px solid #27ae60;
    }
    
    .controls {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
      margin: 10px 0;
    }
    
    input, select {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }
    
    label {
      font-weight: 500;
      margin-right: 5px;
    }
    
    .pipe-syntax {
      background: #2c3e50;
      color: #ecf0f1;
      padding: 8px 12px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
      margin: 5px 0;
    }
    
    .interactive-demo {
      background: #e8f4fd;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    
    .array-demo {
      background: #fff3cd;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    
    .json-demo {
      background: #d1ecf1;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
  </style>
</svelte:head>

<div class="container">
  <h1>🧪 Pipe Preprocessor Test</h1>
  
  <div class="section">
    <h2>Basic String Pipes</h2>
    <div class="demo-grid">
      <div class="demo-card">
        <h3>Uppercase Pipe</h3>
        <div class="pipe-syntax">Original: {name}</div>
        <div class="result">Result: {name | uppercase}</div>
      </div>
      
      <div class="demo-card">
        <h3>Lowercase Pipe</h3>
        <div class="pipe-syntax">Original: {name | uppercase}</div>
        <div class="result">Result: {name | uppercase | lowercase}</div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Currency Pipe</h2>
    <div class="interactive-demo">
      <div class="controls">
        <label>Currency:</label>
        <select bind:value={currencyCode}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
        
        <label>
          <input type="checkbox" bind:checked={showSymbol}>
          Show Symbol
        </label>
      </div>
      
      <div class="demo-card">
        <h3>Currency Formatting</h3>
        <div class="pipe-syntax">Price: {price}</div>
        <div class="result">Formatted: {price | currency: currencyCode, showSymbol}</div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Date Pipe</h2>
    <div class="interactive-demo">
      <div class="controls">
        <label>Format:</label>
        <select bind:value={dateFormat}>
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
          <option value="full">Full</option>
        </select>
      </div>
      
      <div class="demo-grid">
        <div class="demo-card">
          <h3>Current Date</h3>
          <div class="pipe-syntax">Timestamp: {timestamp}</div>
          <div class="result">Formatted: {timestamp | date: dateFormat}</div>
        </div>
        
        <div class="demo-card">
          <h3>Custom Date</h3>
          <div class="pipe-syntax">Date: 2024-01-15</div>
          <div class="result">Formatted: {new Date('2024-01-15') | date: dateFormat}</div>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Array Pipes</h2>
    <div class="array-demo">
      <div class="controls">
        <label>Slice Start:</label>
        <input type="number" bind:value={sliceStart} min="0" max={items.length}>
        
        <label>Slice End:</label>
        <input type="number" bind:value={sliceEnd} min="0" max={items.length}>
        
        <label>Search:</label>
        <input type="text" bind:value={searchTerm} placeholder="Filter items...">
      </div>
      
      <div class="demo-grid">
        <div class="demo-card">
          <h3>Slice Pipe</h3>
          <div class="pipe-syntax">Original: {items}</div>
          <div class="result">Sliced: {items | slice: sliceStart, sliceEnd}</div>
        </div>
        
        <div class="demo-card">
          <h3>Filter Pipe (Reactive)</h3>
          <div class="pipe-syntax">Search Term: "{searchTerm}"</div>
          <div class="result">Filtered: {filteredItems}</div>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Number Padding Pipe</h2>
    <div class="interactive-demo">
      <div class="controls">
        <label>Number:</label>
        <input type="number" bind:value={paddingNumber} min="0" max="999999">
        
        <label>Length:</label>
        <input type="number" bind:value={paddingLength} min="1" max="10">
      </div>
      
      <div class="demo-grid">
        <div class="demo-card">
          <h3>Zero Padding</h3>
          <div class="pipe-syntax">Original: {paddingNumber}</div>
          <div class="result">Padded: {paddingNumber | addZeroPadding: paddingLength}</div>
        </div>
        
        <div class="demo-card">
          <h3>Examples</h3>
          <div class="result">42 → 5 digits: {42 | addZeroPadding: 5}</div>
          <div class="result">7 → 3 digits: {7 | addZeroPadding: 3}</div>
          <div class="result">123 → 6 digits: {123 | addZeroPadding: 6}</div>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>JSON Pipe</h2>
    <div class="json-demo">
      <div class="demo-card">
        <h3>Object to JSON</h3>
        <div class="pipe-syntax">User Data Object</div>
        <div class="result">{userData | json: 2}</div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Chained Pipes</h2>
    <div class="demo-grid">
      <div class="demo-card">
        <h3>Multiple Transformations</h3>
        <div class="pipe-syntax">Original: {name}</div>
        <div class="result">Uppercase: {name | uppercase}</div>
        <div class="result">Lowercase: {name | lowercase}</div>
        <div class="result">Uppercase again: {name | lowercase | uppercase}</div>
      </div>
      
      <div class="demo-card">
        <h3>Array with Multiple Pipes</h3>
        <div class="pipe-syntax">Original: {items}</div>
        <div class="result">Sliced then filtered: {items | slice: 0, 3 | filter: 'a'}</div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Edge Cases</h2>
    <div class="demo-grid">
      <div class="demo-card">
        <h3>Empty Values</h3>
        <div class="result">Empty string: {'' | uppercase}</div>
        <div class="result">Null: {null | uppercase}</div>
        <div class="result">Undefined: {undefined | uppercase}</div>
      </div>
      
      <div class="demo-card">
        <h3>Number Formatting</h3>
        <div class="result">Large number: {1234567.89 | currency: 'USD', true}</div>
        <div class="result">Zero: {0 | currency: 'EUR', false}</div>
      </div>
    </div>
  </div>
</div>