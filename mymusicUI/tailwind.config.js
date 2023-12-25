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
        primary: "#FC403A",
        base2: "#FCEDD9",
        base3: "#FFF0CF",
        base4: "#FFA36B",
        base5: "#FC7856",
      },
    },
  },
  plugins: [],
}

