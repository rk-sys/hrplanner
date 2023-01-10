/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./router.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-500': '#334aff',
        'secondary-500': '#252230',
        'dark-500': '#242424',
        'overlay': '#24242475'
      }
    },
  },
  plugins: [],
}
