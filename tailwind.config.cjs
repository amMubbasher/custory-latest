/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fcb440",
        custoryPrimary: "#FF6600",
        custoryMiddle: '#FF7C36',
        custorySecondary:"#FFB669",
        custoryWhite: "#FFE3C7",  
      },
      screens : {
        xs : "450px"
      }
    },
    
  },
  plugins: [],
};
