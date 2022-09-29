/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./router.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-500': '#324f59'
      }
    },
  },
  plugins: [],
}
