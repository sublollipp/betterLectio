/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        blurple: "#5865F2",
      },
      height: {
        "10v": "10vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "100v": "100vh",
      },
      scale: {
        99: "0.99",
      },
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
          wiggle: {
            "0%, 100%": { transform: "rotate(-10deg)" },
            "50%": { transform: "rotate(10deg)" },
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.5s ease-out",
        wiggle: "wiggle 1.5s ease-in-out infinite",
      },
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  daisyui: {
    themes: [
      "garden",
      "dark",
      "light",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      {
        lectio: {
          primary: "#1b5c9e",
          secondary: "#1b5c9e",
          accent: "#B20C00",
          neutral: "#b8c3cc",
          "base-100": "#fff",
          info: "#53C0F3",
          success: "#339900",
          warning: "#F3CC30",
          error: "#B20C00",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
};
