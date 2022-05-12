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
      lg: '960px',
      xl: '1440px',
    },
    colors: {
      'blue': '#1fb6ff',
      'purple': '#5B21B6',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#3F3F46',
      'gray': '#52525B',
      'gray-light': '#71717A',
      'white': '#ffffff',
      'black': '#000000',
      'labelColor': '#6B7280',
      'purple-700': '#6D28D9',
      'purple-400': '#C084FC',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    minHeight: {
      '4/10': '40%',
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontSize: {
        'labelSize': '17.6px',
        'md' : '16px'
      },
    },
  },

  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
