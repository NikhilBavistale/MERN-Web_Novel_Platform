/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {},
    colors: {
      white: "#ffffff",
      cornflower: "#8ecae6",
      "pacific-blue": "#219ebc",
      elephant: "#023047",
      "selective-yellow": "#ffb703",
      "gold-drop": "#fb8500",
      // homepage
      nyanza: "#D0E3CC",
      "light-yellow": "#F7FFDD",
      mindaro: "#FCFDAF",
      flax: "#EFD780",
      "earth-yellow": "#DBA159",
      // Chapter Background
      "Light-blue" : "#E9EBEE",       
      "Light-gray" : "#F4F4F4",       
      "Light-screen" : "#F4F4E4",       
      "Dark-blue" : "#D5D8DC",       
      "Dark-yellow" : "#FAFAC8",       
      "Wood-grain" : "#EFEFAB",       
      Sepia : "#EAE4D3",       
      White : "#FFF",     
      Dark : "#232323",      
    
    },
  },
  plugins: [require("flowbite/plugin"), require("tailwind-scrollbar")],
};
