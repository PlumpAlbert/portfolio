const defaults = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.{tsx,sass,css}"],
  theme: {
    extend: {
      colors: {
        background: {
          light: "hsl(0, 0%, 94%)",
          dark: "hsl(220, 10%, 12%)",
        },
        productivity: {
          VP: {
            dark: "#8EABE6",
            light: "#2654AE",
          },
          P: {
            dark: "#87EEBB",
            light: "#1BBA6A",
          },
          N: {
            dark: "#D9D9D9",
            light: "#7C7C7C",
          },
          D: {
            dark: "#E9E463",
            light: "#E88761",
          },
          VD: {
            dark: "#FF8766",
            light: "#FF3700",
          },
        },
        modal: {
          dark: "hsl(223, 15%, 15%)",
          light: "#ffffff",
        },
      },
      fontFamily: {
        ...defaults.fontFamily,
        sans: ["Inter", ...defaults.fontFamily.sans],
        header: ["Bebas Neue", "Inter", ...defaults.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
