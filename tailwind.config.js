const defaults = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.{tsx,sass,css}"],
  theme: {
    extend: {
      fontFamily: {
        ...defaults.fontFamily,
        sans: ["Inter", ...defaults.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
