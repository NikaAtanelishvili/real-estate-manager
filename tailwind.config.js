/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        FiraGO: ['FiraGO', 'sans-serif'], // add your custom font
      },
    },
  },
  plugins: [],
}
