module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    screens: {
      "2xl": { max: "1535px" },

      xl: { max: "1279px" },

      lg: { max: "1023px" },

      md: { max: "967px" },

      sm: { max: "639px" },
    },
    extend: {},
    container: {
      center: true,
      padding: "8rem",
      backgroundColor: "white",
    },
  },
  plugins: [],
};
