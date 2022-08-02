/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./index.html",
    "./src/**/*.{js,vue,css}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
