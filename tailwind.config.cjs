/** @type {import('tailwindcss').Config} */
const { createThemes } = require('tw-colors');

module.exports = {
  content: [
    "./router.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-500': '#334aff',
        'primary-500-50': '#334aff50',
        'secondary-500': '#252230',
        'dark-500': '#242424',
        'overlay': '#24242475'
      }
    },
  },
  plugins: [
      createThemes({
        light: {
        },
        dark: {
        }
      })
  ],
}
