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
      'red': "#DC2626",
      'gray-dark': '#3F3F46',
      'gray': '#52525B',
      'gray-light': '#71717A',
      'gray-extraLight' : '#D4D4D8',
      'white': '#ffffff',
      'black': '#000000',
      'labelColor': '#6B7280',
      'purple-700': '#6D28D9',
      'purple-400': '#C084FC',
      'blue-600':'#2563EB',
      'blue-500':'#3B82F6',
      'blue-400':'#60A5FA',
      'blue-800': 'rgb(1, 87, 155)',
      'blue-900': '#1E3A8A'

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
    require('tailwind-scrollbar-hide'),
    // require('@tailwindcss/forms'),

  ],
}
