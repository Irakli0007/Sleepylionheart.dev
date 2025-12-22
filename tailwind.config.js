/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#0a0a0f',
          darker: '#050508',
        },
        aqua: {
          DEFAULT: '#00ffff',
          light: '#7fffd4',
          dark: '#00d4d4',
        },
      },
    },
  },
  plugins: [],
}
