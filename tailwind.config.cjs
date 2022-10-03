/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./router.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-500': '#334AFF',
        'secondary-500': '#252230'
      }
    },
  },
  plugins: [],
}
