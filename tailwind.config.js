/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pbg: {
          yellow: '#F5C800',
          'yellow-light': '#FFD93D',
          'yellow-dark': '#E0B400',
          'yellow-deep': '#C9A200',
          red: '#D72638',
          'red-dark': '#B81F2E',
          'red-light': '#E84057',
          white: '#FFFFFF',
          black: '#1A1A1A',
          gray: '#2D2D2D',
          'gray-light': '#4A4A4A',
          'gray-muted': '#888888',
        }
      },
      fontFamily: {
        // 🔥 Reemplazado Inter por Montserrat en todo
        sans: ['"Montserrat"', 'sans-serif'], // Define la fuente sans por defecto
        heading: ['"Montserrat"', 'sans-serif'], 
        body: ['"Montserrat"', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-sm': ['clamp(2rem, 5vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.025em' }],
        'heading-xl': ['clamp(1.75rem, 3.5vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading-lg': ['clamp(1.4rem, 2.5vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0,0,0,0.07)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.13)',
        'nav': '0 2px 20px rgba(0,0,0,0.08)',
        'btn': '0 4px 16px rgba(215,38,56,0.35)',
      },
      borderRadius: {
        'xl2': '1.25rem',
        '2xl2': '1.75rem',
      },
      backdropBlur: {
        xs: '4px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulse_ring: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        pulse_ring: 'pulse_ring 2s ease-out infinite',
      }
    },
  },
  plugins: [],
}