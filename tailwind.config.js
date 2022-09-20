module.exports = {
  content: [
      "./src/**/*.{html,js,tsx}",
    './public/index.html'
  ],
  theme: {
    screens: {

      xs: '0',
      sm: '390px',//'550px',
      md:  '650px',//'650px',
      //md: '768px',
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
      'dark-red': "#750b0b",
      'gray-extraDark': "#1F2937",
      'gray-dark': '#3F3F46',
      'gray': '#52525B',
      'gray-light': '#71717A',
      'gray-extraLight' : '#D4D4D8',
      'gray-mediumLight': '#aeaeb5',
      'white': '#ffffff',
      'black': '#000000',
      'labelColor': '#6B7280',
      'purple-700': '#6D28D9',
      'purple-400': '#C084FC',
      'purple-800': '#6B21A8',
      'purple-900': '#581C87',
      'blue-600':'#2563EB',
      'blue-500':'#3B82F6',
      'blue-400':'#60A5FA',
      'blue-800': 'rgb(1, 87, 155)',
      'blue-900': '#1E3A8A',
      'font-home': 'rgb(35, 55, 72)',
      'homeSection': '#f7fafd',
      'footerLight' : '#A3A3A3',
      'fuchsia-800' : '#86198F',
      'fuchsia-900' : '#701A75'

    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      'poppins' : ['"Poppins"'],
      'noto-sans' : ['"Noto Sans"'],
      'sonsie-one' : ['"Sonsie One"'],
      'courgette': ['"Courgette"']
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
        'sm' : '12px',
        'md': '15px',
        'lg': '18px',
        '1/5lg' : '24px',
        '2lg' : '30px',

      },
      width: {
        'w-44' : '185px',
        'w-8/9' : '98%',
        'w-2/3' : '66,6%',
        'w-1/3' : '33,3%',
        'w-76' : '295px'
      },
      leading: {
        '5': '1.25'
      },
      filter: {
        "brightness-20" :"0.2"
      },
      zIndex: {
        "z-100" : "2500"
      },
      boxShadow: {
        "zz" : "0 0 3em #E7E5E4",
        "mm" : "0 0 3em #000000"
      },
      translate: {
        "translate-x-50": "transform:translateX(-50%)",
        "translate-y-50": "transform:translateY(-50%)"

      },
      padding: {
        'pr-2/5' : 'padding-right: -0.175rem',

      },
      inset:{
         'bottom-1/10': "bottom: 10rem",
         'left-9/10' : "left: 90%"
      }
    },
  },

  plugins: [
    require('tailwind-scrollbar-hide'),
    // require('@tailwindcss/forms'),

  ],
}
