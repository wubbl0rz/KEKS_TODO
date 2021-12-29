import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({ out: 'wwwroot' }),

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte'
  }
};

export default config;