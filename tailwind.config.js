/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Karla", "sans-serif"],
      },

      gridTemplateColumns: {
        cards: "auto-fit, minmax(250px, 250px)",
      },
    },
  },
  plugins: [],
};
