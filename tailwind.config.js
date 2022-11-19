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
          2: "#8EABE6",
          1: "#87EEBB",
          0: "#D9D9D9",
          ["-1"]: "#E9E463",
          ["-2"]: "#FF8766",
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
