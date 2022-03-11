module.exports = {
  content: [
      "./src/**/*.{html,js,tsx}",
    './public/index.html'
  ],
  theme: {
    screens: {
      xs: '0px',
      sm: '520px',
      md: '768px',
      lg: '900px',
      xl: '1440px',
    },
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#9CA3AF',
      'white': '#ffffff',
      'black': '#000000'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
