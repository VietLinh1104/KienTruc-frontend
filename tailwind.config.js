/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // Tên font bạn thêm
      },
      colors: {
        cusGray: '#718096',
        cusGreen: '#B9E901',
        cusWhite: '#E0E0FF',
        cusBlack: '#111',
      },

    },
  },
  plugins: [],
}

