/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#bae6ff',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c3d66',
        },
        accent: {
          50: '#faf5ff',
          100: '#f3e8ff',
          300: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        danger: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        }
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)',
        'gradient-vibrant': 'linear-gradient(135deg, #d946ef 0%, #0ea5e9 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1e1b4b 0%, #0c3d66 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(217, 70, 239, 0.1) 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(14, 165, 233, 0.3)',
        'glow-accent': '0 0 20px rgba(217, 70, 239, 0.3)',
      },
      animation: {
        'gradient': 'gradient 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
      }
    },
  },
  plugins: [],
}
