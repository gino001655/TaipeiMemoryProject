/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vintage-paper': '#F5F2E9', // Warm beige/paper
        'ink-black': '#2C2C2C',     // Soft black like ink
        'sepia-500': '#8B5E3C',     // Classic sepia
        'warm-gray': '#A8A29E',     // Stone/Old wall
        'vermilion': '#C04000',     // Traditional seal red
        'deep-brown': '#4A3728',    // Wood/Dark leather
      },
      fontFamily: {
        serif: ['"Noto Serif TC"', '"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      backgroundImage: {
        'paper-texture': "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
      }
    },
  },
  plugins: [],
}










