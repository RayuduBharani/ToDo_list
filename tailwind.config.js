/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: '520px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      lightGrayBlue: 'rgb(224 232 240)',
      black:"rgb(225 29 72)",
      darkSlateBlue: '#000',
      brightBlue: 'rgb(224 232 238)',
      turquoise: '#1ABC9C',
      darkTurquoise: '#16A085',
      darkHover: '#34495E',
      white:"#ffff"
    }
  },
  plugins: [
    require('daisyui')
  ],
}