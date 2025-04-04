/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Enhanced green palette (5 shades)
        'plant-green-lightest': '#d1ebd8',
        'plant-green-light': '#a8d8b9',
        'plant-green-medium': '#7ac1a1',
        'plant-green-dark': '#4f9a84',
        'plant-green-darkest': '#2c7a6e',
        
        // Enhanced earth tones (3 shades)
        'earth-light': '#f5f0e1',
        'earth-medium': '#d4c2a5',
        'earth-dark': '#b39578',
        
        // Accent colors (expanded for different states and elements)
        'accent-pink': '#ffb6c1',
        'accent-pink-dark': '#e6a0aa',
        'accent-yellow': '#ffd700',
        'accent-yellow-dark': '#e6c200',
        'accent-blue': '#87cefa',
        'accent-blue-dark': '#5eb1e5',
        
        // Status colors
        'healthy': '#7ac17a',
        'warning': '#ffcc66',
        'danger': '#ff8c8c',
        'dormant': '#b3a599',
        
        // UI colors
        'background': '#fcfaf7',
        'card-bg': '#ffffff',
        'text-primary': '#2c3e50',
        'text-secondary': '#5d6c7b',
      },
      fontFamily: {
        'primary': ['Nunito', 'sans-serif'],
        'secondary': ['Quicksand', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '1rem',
        'xl': '1.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'grow': 'grow 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        grow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      spacing: {
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
      },
    },
  },
  plugins: [],
}