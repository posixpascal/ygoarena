/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                times: "Times New Roman",
            },
            colors: {
                transparent: "transparent",
                current: "currentColor",
                background: "rgb(217 228 232 / <alpha-value>)"
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography')
    ],
}
