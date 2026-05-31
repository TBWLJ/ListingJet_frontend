import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#071527",
        ink: "#102033",
        gold: "#d7a84b",
        mint: "#2fbf8f"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(7, 21, 39, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
