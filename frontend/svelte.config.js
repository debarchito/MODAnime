import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';

const dev = process.env.NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    preprocess({
      postcss: true
    })
  ],
  kit: {
    target: '#svelte',
    adapter: adapter({
      out: 'dist'
    }),
    vite: {
      mode: dev ? 'production' : 'development'
    }
  }
};

export default config;
