/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FAF8F2",
        forest: {
          DEFAULT: "#0E3B2E",
          600: "#164634",
          700: "#0E3B2E",
          900: "#082A20",
        },
        emerald: { DEFAULT: "#1C7A54" },
        gold: { DEFAULT: "#B8872E", light: "#E4C173", dark: "#8A6421" },
        ink: "#132119",
        sage: "#EEF3EC",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      fontFamily: {
  display: ["Fraunces", "serif"],
  body: ["'Plus Jakarta Sans'", "sans-serif"],
  mono: ["'IBM Plex Mono'", "monospace"],
  bengali: ["'Hind Siliguri'", "sans-serif"],
},
    },
  },
  plugins: [],
};