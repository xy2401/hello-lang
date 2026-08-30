import { defineConfig } from 'vite'

export default defineConfig({
  envDir: '..',
  plugins: [{
    name: 'hello-lang-local-cross-origin-isolation',
    configureServer(server) {
      server.middlewares.use((_request, response, next) => {
        response.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
        response.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
        next()
      })
    },
  }],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
})
