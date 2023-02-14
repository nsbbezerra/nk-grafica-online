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
      colors: {
        primary: {
          50: "#dce4ef",
          100: "#bacadf",
          200: "#97b1d0",
          300: "#7298c0",
          400: "#4a80b0",
          500: "#0369a1",
          600: "#125784",
          700: "#174668",
          800: "#17354e",
          900: "#152535",
        },
        secondary: {
          50: "#d6dce2",
          100: "#adbbc5",
          200: "#869aaa",
          300: "#5f7b8f",
          400: "#385d74",
          500: "#00415b",
          600: "#09374c",
          700: "#0d2d3d",
          800: "#0f232f",
          900: "#0e1a21",
        },
      },
    },
  },
  plugins: [],
};
