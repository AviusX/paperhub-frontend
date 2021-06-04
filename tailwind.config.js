module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#8A1FEB',
        'secondary': '#F8F0FF',
        'accent': '#EB1FC4'
      },
      fontFamily: {
        'logo': ['Comfrey Regular']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
