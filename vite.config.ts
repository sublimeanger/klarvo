import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import vitePrerender from "vite-plugin-prerender";
import { ssgRoutes } from "./src/ssgRoutes";

const Renderer = vitePrerender.PuppeteerRenderer;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: ssgRoutes,
      renderer: new Renderer({
        maxConcurrentRoutes: 4,
        renderAfterDocumentEvent: 'prerender-ready',
        headless: true,
      }),
      postProcess(renderedRoute) {
        // Ensure route matches original to prevent redirect issues
        renderedRoute.route = renderedRoute.originalRoute;
        return renderedRoute;
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
