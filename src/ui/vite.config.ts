import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import ViteDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), tailwindcss(), ViteDevTools()],
	base: "./",
	build: {
		outDir: "../../dist/ui"
	}
});
