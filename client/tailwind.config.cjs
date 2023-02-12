/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    backgroundSize: {
      link: '200% 100%',
    },
    backgroundPosition: {
      reverse: '-100%',
      normal: '0',
    },
    extend: {
      colors: {
        start: '#8BE8CB',
        stop: '#000 50%',
      },
      gridTemplateAreas: {
        court: [
          'left-alley left-behind right-behind right-alley',
          'left-alley deuce ad right-alley',
        ],
      },
      gridTemplateColumns: {
        court: '5rem 14rem 14rem 5rem',
      },
      gridTemplateRows: {
        court: '20rem 20rem',
      },
      translate: {
        negative: '-50%',
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
