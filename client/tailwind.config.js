/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", 
  ],
  theme: {
    extend: {
      colors: {
        black: "#1C1C1C", 
        gray: "#282828",
        accent: {
          green: "#00FF84", 
          blue: "#007ACC", 
          offwhite: "#E5E5E5",
          muted: "#B3B3B3", 
        },

      },
      fontFamily: {
        sans: ["Roboto Mono", "monospace"], 
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
