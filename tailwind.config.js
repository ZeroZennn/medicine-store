/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}', './templates/*.{html,js}', './assets/js/*.{html,js}', './admin/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"],
  },
}