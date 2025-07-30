import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { createIDEFriendlyPipePreprocessor } from './pipe-preprocessor.js';
// import { createPipePreprocessor } from './pipe-preprocessor.js';
const pipePreprocessor = createIDEFriendlyPipePreprocessor({
	pipePrefix: '', // No prefix by default
	debug: process.env.NODE_ENV === 'development',
	ideMode: false // Temporarily disable IDE mode
});
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [pipePreprocessor, vitePreprocess()],
	kit: { adapter: adapter() }
};

export default config;
