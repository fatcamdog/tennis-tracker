/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateAreas: {
        court: [
          'left-alley left-behind right-behind right-alley',
          'left-alley deuce ad right-alley',
        ],
      },
      gridTemplateColumns: {
        court: '5rem 16rem 16rem 5rem',
      },
      gridTemplateRows: {
        court: '18rem 18rem',
      },
    },
  },
  plugins: [require('daisyui'), require('@savvywombat/tailwindcss-grid-areas')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#101935',
          secondary: '#2D82B7',
          accent: '#8BE8CB',
          neutral: '#FCFBF4',
          'base-100': '#ded9d7',
          error: '#CC0000',
          success: '#4BB543',
        },
      },
    ],
  },
};
