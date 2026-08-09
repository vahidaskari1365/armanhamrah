import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('framer-motion') || id.includes('/motion/')) return 'animations';
          if (id.includes('@supabase')) return 'supabase';
          if (id.includes('react-helmet-async') || id.includes('react-router')) return 'router';
          if (id.includes('recharts') || id.includes('d3-') || id.includes('victory')) return 'charts';
          if (id.includes('@radix-ui') || id.includes('cmdk') || id.includes('vaul') || id.includes('react-day-picker') || id.includes('input-otp') || id.includes('embla')) return 'ui';
          return 'vendor';
        },
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));