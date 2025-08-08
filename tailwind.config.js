// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./resources/**/*.blade.php",
//     "./resources/**/*.js",
//     "./resources/**/*.vue",
//     "./src/**/*.{vue,js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         sora: ['Sora', 'sans-serif'],
//          inter: ['Inter', 'sans-serif'],
//       },
//     },
//   },
//   plugins: [],
// }



export default {  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff8f6',
          100: '#fff1ed',
          200: '#ffe0d5',
          300: '#ffc7b0',
          400: '#ff9a73',
          500: '#ff6937', // Main orange color
          600: '#ff5a20',
          700: '#e54a1b',
          800: '#bf3c18',
          900: '#9c3216',
        },
        dark: {
          900: '#121212', // Main dark background
          800: '#1a1a1a',
          700: '#262626',
          600: '#333333',
          500: '#404040',
        }
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out forwards',
        'slideIn': 'slideIn 0.5s ease-in-out forwards',
        'slideUp': 'slideUp 0.5s ease-in-out forwards',
        'slideInDown': 'slideInDown 0.3s ease-in-out forwards',
        'bounce': 'bounce 1s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        }
      },
    },
  },
  variants: {
    extend: {
      scale: ['group-hover'],
      opacity: ['group-hover'],
    },
  },
}
