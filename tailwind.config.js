/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        tablet: { max: "991px" },
        mobile: { max: "767px" },
      },
    },
  },
  plugins: [],
};
