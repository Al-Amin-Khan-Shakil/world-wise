import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import stylelint from "stylelint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), stylelint()],
});
