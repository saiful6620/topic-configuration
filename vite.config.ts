import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        process.cwd(),
        "/Users/saiful/Projects/QuestionPro/wick-ui/wick-ui-lib/dist/fonts/wick-icon.ttf",
      ],
    },
  },
});
