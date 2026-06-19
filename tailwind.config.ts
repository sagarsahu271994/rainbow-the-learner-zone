import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#15233f",
        cream: "#fffaf2",
        coral: "#ff6b55",
        sunshine: "#f8c84a",
        leaf: "#35aa72",
        sky: "#4b9fea",
        violet: "#8358d4"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(21,35,63,.10)"
      }
    }
  },
  plugins: []
} satisfies Config;
