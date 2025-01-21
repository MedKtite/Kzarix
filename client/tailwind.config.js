/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,css,scss,sass,less,styl}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#1C1C1C", 
        gray: "#282828",
        "dark-blue": "#1D1E2C",
        "primary-light-gray": "#B3B3B3",
        "primary-off-white": "#E5E5E5",
        "primary-lighter-gray": "#D3D3D3",
        "primary-dark-slate": "#2F4F4F",
        "secondary-purple": "#6A0DAD",
        accent: {
          green: "#00FF84", 
          blue: "#007ACC", 
          offwhite: "#E5E5E5",
          muted: "#B3B3B3", 
        },
      },
      fontFamily: {
        sans: ["Roboto", "monospace"], 
        "poppins-regular": ["Poppins", "sans-serif"],
        "poppins-semi-bold": ["Poppins", "sans-serif"],
      },
      fontSize: {
        h1: ["36px", { lineHeight: "1.5", fontWeight: "700" }],
        h2: ["30px", { lineHeight: "1.5", fontWeight: "600" }],
        h3: ["24px", { lineHeight: "1.5", fontWeight: "600" }],
        h4: ["20px", { lineHeight: "1.5", fontWeight: "500" }],
        h5: ["18px", { lineHeight: "1.5", fontWeight: "500" }],
        h6: ["16px", { lineHeight: "1.5", fontWeight: "500" }],
        paragraph: ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        small: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};