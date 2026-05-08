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
        display: ["Inter", "system-ui", "sans-serif"], // Switching to clean sans for display too
      },
      colors: {
        navy: {
          DEFAULT: "#003366",
          dark: "#002244",
          light: "#004488",
        },
        accent: {
          DEFAULT: "#E30613",
          hover: "#C20510",
          light: "#FFEBEC",
        },
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          900: "#0F172A",
        }
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
