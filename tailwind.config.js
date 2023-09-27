/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
const aspectRatioReq = require('@tailwindcss/aspect-ratio')

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: ['class'],
    theme: {
        // ...
        extend: {
            // ...
            fontFamily: {
                sans: [
                    'Poppins',
                    'sans-serif',
                    ...defaultTheme.fontFamily.sans,
                ],
            },
        },
    },
    corePlugins: {
        aspectRatio: false,
    },
    plugins: [
        // ...
        aspectRatioReq,
    ],
}
