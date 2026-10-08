import react from "@vitejs/plugin-react";
import { execSync } from "child_process";
import fs from "fs";
import { resolve } from "path";
import { Plugin, defineConfig } from "vite";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";

/**
 * 1. Compiles tokens.scss → dist/styles/tokens.css  (standalone, for Storybook)
 * 2. Prepends the compiled tokens into dist/styles/index.css so consumers only
 *    need ONE import and CSS var resolution is always correct regardless of
 *    the order the browser processes stylesheets.
 */
function emitTokensPlugin(): Plugin {
  return {
    name: "emit-tokens",
    closeBundle() {
      const outDir = resolve(__dirname, "dist/styles");
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

      // Compile tokens.scss → tokens.css
      execSync(
        `npx sass src/styles/tokens.scss dist/styles/tokens.css --no-source-map --style=compressed`,
        { cwd: __dirname, stdio: "inherit" }
      );

      // Prepend tokens into index.css so :root vars are always defined first
      const tokens = fs.readFileSync(resolve(__dirname, "dist/styles/tokens.css"), "utf8");
      const components = fs.readFileSync(resolve(__dirname, "dist/styles/index.css"), "utf8");
      fs.writeFileSync(resolve(__dirname, "dist/styles/index.css"), tokens + "\n" + components);

      console.log("✓ tokens.css emitted");
      console.log("✓ tokens prepended into index.css");
    },
  };
}

export default defineConfig({
  plugins: [
    svgr({ include: "**/*.svg" }),
    react(),
    dts({ include: ["src"], exclude: ["src/**/*.stories.tsx", "src/prototypes"], rollupTypes: true }),
    emitTokensPlugin(),
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
          // Component CSS goes to styles/index.css (not tokens.css)
          if (assetInfo.name?.endsWith(".css")) {
            return "styles/index.css";
          }
          return assetInfo.name ?? "asset";
        },
      },
    },
    cssCodeSplit: false,
  },
});
