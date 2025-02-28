import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'navy-500': '#1e2a54',
        'navy-900': '#050a1d',
        primary: '#16e9d3',
        secondary: '#1e2a54',
        surface: '#1a233d',
        thColor: '#00000099',
        'text-secondary': '#a0aec0',
        accent: '#ff6b6b',
        success: '#48bb78',
        warning: '#f6e05e',
        info: '#4299e1'
      },
      fontSize: {
        tiny: '0.65rem'
      }
    }
  },
  darkMode: 'class',
  plugins: [heroui()]
};
