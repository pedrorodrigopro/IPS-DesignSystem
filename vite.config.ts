import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    svgr({ include: "**/*.svg" }),
    react(),
    dts({ include: ["src"], exclude: ["src/**/*.stories.tsx", "src/prototypes"] }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/components/index.ts"),
      name: "IPSDesignSystem",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "styles/tokens.css";
          }
          return assetInfo.name ?? "asset";
        },
      },
    },
    cssCodeSplit: false,
  },
});
