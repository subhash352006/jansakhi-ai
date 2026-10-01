/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
        deepteal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        telugu: ['"Noto Sans Telugu"', 'Gautami', 'Vani', '"Tenali Ramakrishna"', '"Nirmala UI"', 'sans-serif'],
        tamil: ['"Noto Sans Tamil"', 'Latha', 'Vijaya', '"Nirmala UI"', 'sans-serif'],
        devanagari: ['"Noto Sans Devanagari"', 'Mangal', 'Aparajita', 'Kokila', '"Nirmala UI"', 'sans-serif'],
        kannada: ['"Noto Sans Kannada"', 'Tunga', 'Mallige', '"Nirmala UI"', 'sans-serif'],
        malayalam: ['"Noto Sans Malayalam"', 'Kartika', 'Meera', '"Nirmala UI"', 'sans-serif'],
        bengali: ['"Noto Sans Bengali"', 'Vrinda', '"Shonar Bangla"', '"Nirmala UI"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
