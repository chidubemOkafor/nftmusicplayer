/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu"],
      },
      animation: {
        spin2: "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};
