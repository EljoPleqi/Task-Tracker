module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        oneThreeOne: '1fr 3fr 1fr',
        twoThree: '2fr 3fr',
        oneFour: '1fr 4fr',
      },
    },
  },
  plugins: [],
};
