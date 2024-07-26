import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { splitVendorChunkPlugin } from "vite";

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
    port: 443,
  },
  resolve: {
    alias: {
      "@": "./src",
    },
  },
});
