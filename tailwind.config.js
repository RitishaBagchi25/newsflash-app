/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Libre Franklin', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#D85A30',
          50: '#FEF7F4',
          100: '#FDECE6',
          200: '#FBD8CA',
          300: '#F8BBA5',
          400: '#F28F6B',
          500: '#D85A30',
          600: '#B8441F',
          700: '#933419',
          800: '#7A2D18',
          900: '#682818',
        },
        category: {
          business: '#3B82F6',
          entertainment: '#EC4899',
          general: '#6B7280',
          health: '#10B981',
          science: '#8B5CF6',
          sports: '#F59E0B',
          technology: '#06B6D4',
        },
      },
    },
  },
  plugins: [],
};
