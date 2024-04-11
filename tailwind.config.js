// file left intentionally blank for tailwind detection

const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [path.join(__dirname, './src/**/*.{js,ts,jsx,tsx}'), path.join(__dirname, './index.html')],
  theme: {
    extend: {},
  },
  plugins: [],
};