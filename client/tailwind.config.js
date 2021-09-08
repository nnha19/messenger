module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#0074FD",
        secondary: "#F1CCCC",
        bgPrimary: "#C4C4C4",
        backDrop: "#000000b8",
      },
      height: {
        md: "31rem",
      },
      width: {
        md: "31rem",
      },
    },
    boxShadow: {
      sm: "0 1px 1px 1px gray",
      md: "0 2px 2px 2px gray",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
