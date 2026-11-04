import react from "@vitejs/plugin-react";
import fs from "fs";
import { resolve } from "path";
import * as sass from "sass";
import { Plugin, defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

/**
 * Standalone browser build: one script + one stylesheet, React included.
 *
 *   dist-standalone/ips.js   IIFE, exposes the global `IPS`
 *   dist-standalone/ips.css  tokens + reset + all component CSS
 *
 * The library build (vite.config.ts) is untouched and still externalises React.
 */
// Mulish (SIL OFL, see src/styles/fonts/OFL.txt), embedded so the stylesheet needs
// no network. Variable fonts: one file per script subset covers weights 200–1000.
const MULISH_SUBSETS: Record<string, string> = {
  "mulish-latin.woff2":
    "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329," +
    "U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD",
  "mulish-latin-ext.woff2":
    "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329," +
    "U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF",
};

function embeddedFontFaces(): string {
  return Object.entries(MULISH_SUBSETS)
    .map(([file, range]) => {
      const b64 = fs.readFileSync(resolve(__dirname, "src/styles/fonts", file)).toString("base64");
      return (
        "@font-face{font-family:'Mulish';font-style:normal;font-weight:200 1000;font-display:swap;" +
        `src:url(data:font/woff2;base64,${b64}) format('woff2');unicode-range:${range};}`
      );
    })
    .join("\n");
}

function prependBaseStyles(): Plugin {
  return {
    name: "standalone-base-styles",
    closeBundle() {
      const file = resolve(__dirname, "dist-standalone/ips.css");
      const compile = (p: string) =>
        sass.compile(resolve(__dirname, p), { style: "compressed" }).css;
      // Fonts first, then the same order Storybook's preview uses:
      // tokens + reset, then components.
      const base =
        embeddedFontFaces() +
        "\n" +
        compile("src/styles/tokens.scss") +
        "\n" +
        compile("src/styles/reset.scss");
      fs.writeFileSync(file, base + "\n" + fs.readFileSync(file, "utf8"));
      console.log("✓ fonts + tokens + reset prepended into ips.css");
    },
  };
}

export default defineConfig({
  plugins: [svgr({ include: "**/*.svg" }), react(), prependBaseStyles()],
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  publicDir: false, // do not copy public/ into the standalone output
  build: {
    outDir: "dist-standalone",
    emptyOutDir: true,
    // Inline every asset so the bundle never points at another file.
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, "src/standalone.ts"),
      name: "IPS",
      formats: ["iife"],
      fileName: () => "ips.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: (info) => (info.name?.endsWith(".css") ? "ips.css" : (info.name ?? "asset")),
      },
    },
  },
});
