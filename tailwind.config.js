module.exports = {
    purge: [
        './src/**/*.{js,jsx,ts,tsx}',
        './public/index.html'
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'primary': '#8A1FEB',
                'primary-dark': '#180529',
                'secondary': '#F3E6FF',
                'accent': '#EB1FC4',
                'blurple': '#5865F2'
            },
            fontFamily: {
                'display': 'Nunito, sans-serif',
                'body': 'Titillium Web, sans-serif',
                'logo': 'Gondola SD'
            },
            height: {
                'nav-screen': 'calc(100vh - 4rem)' // The full height of screen with navbar taken into account.
            },
            maxHeight: {
                '0': '0',
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                'full': '100%',
                'nav-screen': 'calc(100vh - 4rem)'
            },
            maxWidth: {
                '0': '0',
                '1/6': '16%',
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
            transform: ['hover'],
            brightness: ['hover'],
            backdropFilter: ['hover'],
            backdropBrightness: ['hover'],
            opacity: ['disabled'],
            cursor: ['disabled'],
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: "class"
        }),
    ],
}