/** @type {import('tailwindcss').Config} */
// Brand tokens copied from topnotchsecuritysolutions.com so these pages match the main site.
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '1rem', screens: { '2xl': '1200px' } },
    extend: {
      colors: {
        security: {
          navy: '#0F1829',
          'navy-light': '#1A2540',
          blue: '#1E3A8A',
          yellow: '#FBBF24',
          gold: '#E0A800',
          gray: '#374151',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: { 'fade-up': 'fade-up .35s ease-out both' },
    },
  },
  plugins: [],
};
