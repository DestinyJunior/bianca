import vue from "@vitejs/plugin-vue";
const path = require("path");

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */

export default {
  plugins: [vue()],
  build: {
    outDir: path.resolve(__dirname, "../public"),
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
};
