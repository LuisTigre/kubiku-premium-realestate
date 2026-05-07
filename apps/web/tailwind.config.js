/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cobalt: '#1A52CC',
          sapphire: '#3A7AFF',
          navy: '#0D2870',
          quartz: '#B8C4D8',
          pearl: '#F0F0F4',
          graphite: '#1A1A2E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 10px -2px rgba(0, 0, 0, 0.02)',
        'bloom': '0 20px 40px -10px rgba(26, 82, 204, 0.15)',
      }
    },
  },
  plugins: [],
}
