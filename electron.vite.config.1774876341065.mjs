// electron.vite.config.ts
import { defineConfig } from "electron-vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
var electron_vite_config_default = defineConfig({
  main: {},
  preload: {},
  renderer: {
    plugins: [svelte(), tailwindcss()]
  }
});
export {
  electron_vite_config_default as default
};
