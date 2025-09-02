import type { Config } from "tailwindcss";

const config: Config = {

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: "#F6F1EE",
          100: "#EADFD9",
          200: "#D0BFB8",
          300: "#B69F97",
          400: "#997B6F",
          500: "#6E4A37", // main coffee brown
          600: "#5C3E2F",
          700: "#4A3227",
          800: "#38261E",
          900: "#281A15",
        },
      },
      container: { center: true, padding: "1rem" },
    },
  },
  plugins: [],
};

export default config;
