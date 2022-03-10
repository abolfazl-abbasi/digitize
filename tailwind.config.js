module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Yekan"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "base", // only generate global styles
      strategy: "class", // only generate classes
    }),
  ],
};
