import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Altere se quiser uma porta diferente
    open: true,  // Abre automaticamente o navegador
    host: true,  // Permite acesso via rede local
    historyFallback: true,
  },
  build: {
    outDir: 'dist',
  },
  base: '/', // Garante que todas as rotas usem a raiz corretamente
});
