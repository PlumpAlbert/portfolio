const defaults = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.{tsx,sass,css}"],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#E6E6E6",
          dark: "#1E1E1E",
        },
        productivity: {
          2: "#8EABE6",
          1: "#87EEBB",
          0: "#D9D9D9",
          ["-1"]: "#E9E463",
          ["-2"]: "#FF8766",
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
