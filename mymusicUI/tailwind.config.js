/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        init: ["Tilt Neon", 'sans-serif'],
      },
      colors:{
        primary: "#F03C3C",
        secondary: "#FF8C8C",
        base3: "#FFC3C3",
        base4: "#FF5D5D",
        alternative: "#FFE3A9",
      },
    },
  },
  plugins: [],
}

