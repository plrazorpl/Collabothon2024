/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#023c45",
        accent: "#F9B20A",
        primaryBackground: "#D9D9D9",
      },
      boxShadow: {
        custom: "8px 8px 0px 0px rgba(66, 68, 90, 0.37)",
      },
    },
  },
  plugins: [],
};
