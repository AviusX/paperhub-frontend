module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#8A1FEB',
        'secondary': '#F8F0FF',
        'accent': '#EB1FC4',
        'dark': '#180529',
        'blurple': '#5865F2'
      },
      fontFamily: {
        'display': 'Nunito, sans-serif',
        'body': 'Titillium Web, sans-serif',
        'logo': 'Verbena'
      },
      maxHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      maxWidth: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      }
    },
  },
  variants: {
    extend: {
      filter: ['hover'],
      brightness: ['hover'],
      backdropFilter: ['hover'],
      backdropBrightness: ['hover']
    },
  },
  plugins: [],
}
