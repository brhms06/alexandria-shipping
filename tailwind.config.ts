import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      colors: {
        navy: {
          DEFAULT: "#0A2F6E",
          dark: "#061E47",
          light: "#0E3D8A",
        },
        brand: {
          DEFAULT: "#2B7FFF",
          hover: "#1A6AE0",
          light: "#EBF2FF",
          50: "#F0F6FF",
        },
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "slide-up": "slideUp 0.6s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
