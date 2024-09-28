import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //Here changing port from 5173 -> localHost:3000
  server: {
    port: 3000,
  },
});
