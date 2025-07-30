<script>
  import { capitalize, truncate, reverse, slugify, toUpperCase, toLowerCase } from './custom-pipes/string-pipes.js';
  import { formatCurrency, round, percentage, formatNumber, padStart } from './custom-pipes/number-pipes.js';
  import { filter, map, slice, sort, unique, join, length } from './custom-pipes/array-pipes.js';
  import { formatDate, relativeTime, isToday, isYesterday } from './custom-pipes/date-pipes.js';
  
  let user = { name: 'john doe', email: 'john@example.com' };
  let price = 29.99;
  let number = 42;
  let posts = [
    { title: 'First Post', date: new Date('2024-01-01'), author: 'John' },
    { title: 'Second Post', date: new Date('2024-01-15'), author: 'Jane' },
    { title: 'Third Post', date: new Date(), author: 'John' }
  ];
  let tags = ['javascript', 'svelte', 'pipes', 'javascript', 'tutorial'];
</script>

<main>
  <h1>Custom Pipes Demo</h1>
  
  <section>
    <h2>String Pipes</h2>
    <p>Original: {user.name}</p>
    <p>Capitalized: {user.name | capitalize}</p>
    <p>Uppercase: {user.name | toUpperCase}</p>
    <p>Lowercase: {user.name | toLowerCase}</p>
    <p>Reversed: {user.name | reverse}</p>
    <p>Slugified: {user.name | slugify}</p>
    <p>Truncated: {user.email | truncate:15}</p>
  </section>
  
  <section>
    <h2>Number Pipes</h2>
    <p>Original: {price}</p>
    <p>Currency: {price | formatCurrency}</p>
    <p>EUR: {price | formatCurrency:'EUR'}</p>
    <p>Rounded: {price | round:1}</p>
    <p>Percentage: {0.75 | percentage}</p>
    <p>Formatted: {number | formatNumber}</p>
    <p>Padded: {number | padStart:5}</p>
  </section>
  
  <section>
    <h2>Array Pipes</h2>
    <p>Original tags: {join(tags)}</p>
    <p>Unique tags: {join(unique(tags))}</p>
    <p>Filtered posts: {length(filter(posts, post => post.author === 'John'))} posts by John</p>
    <p>Post titles: {join(map(posts, post => post.title))}</p>
    <p>Recent posts: {join(map(slice(posts, 0, 2), post => post.title))}</p>
  </section>
  
  <section>
    <h2>Date Pipes</h2>
    <p>First post: {posts[0].date | formatDate:'long'}</p>
    <p>Recent post: {posts[2].date | formatDate:'short'}</p>
    <p>Time ago: {posts[0].date | relativeTime}</p>
  </section>
  
  <section>
    <h2>Chained Pipes</h2>
    <p>Complex: {user.name | capitalize | truncate:8 | reverse}</p>
    <p>Price chain: {price | formatCurrency:'USD' | toUpperCase}</p>
    <p>Array chain: {tags | unique | map:tag => tag.toUpperCase() | join:' - '}</p>
  </section>
  
  <section>
    <h2>Interactive Demo</h2>
    <div class="controls">
      <label for="input-text">Text:</label>
      <input id="input-text" type="text" bind:value={user.name} />
      
      <label for="input-price">Price:</label>
      <input id="input-price" type="number" bind:value={price} step="0.01" />
    </div>
    
    <div class="results">
      <p>Original: {user.name}</p>
      <p>Capitalized: {user.name | capitalize}</p>
      <p>Price: {price | formatCurrency}</p>
      <p>Rounded: {price | round:2}</p>
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
    width: 80px;
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