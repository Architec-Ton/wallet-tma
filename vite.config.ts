import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react-swc";
import { defineConfig , splitVendorChunkPlugin } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/wallet",
  plugins: [
    react(),
    basicSsl({
      /** name of certification */
      name: "test",
      /** custom trust domains */
      domains: ["*.local"],
      /** custom certification directory */
      certDir: "./cert",
    }),
    nodePolyfills(),
    splitVendorChunkPlugin(),
  ],
  server: {
    host: "architecton.local",
    port: 1111,
  },
  resolve: {
    alias: {
      "@": "./src",
    },
  },
});
