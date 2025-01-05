import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	// extensions: ['.ts', '.js', '.mjs', '.json'],
	resolve: {
		extensions: ['.ts', '.js', '.mjs', '.json'],
		alias: {
		  $lib: path.resolve("src/lib"),
		},
	  },
});
