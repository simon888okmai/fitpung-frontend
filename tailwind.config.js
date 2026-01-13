/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        line: ["LINESeedSans-Regular"],
        "line-bold": ["LINESeedSans-Bold"],
        "line-xbold": ["LINESeedSans_XBd"],
      },
      colors: {
        primary: "#B1FC30", // Blue-500 as default primary
        color: "#1C1C1C",   // Gray-100 as default background color
      },
    },
  },
  plugins: [],
}
