/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/html/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "cb-blue": "#002E3C",
      "bottle-green": "#002E3C",
      "bottle-green-light": "#1d5b6e",
      "cb-yellow": "#ffd700",
      bgColor: 'var(--bgColor)',
      bgColor2: 'var(--bgColor2)',
      textColor: 'var(--textColor)',
      textColor2: 'var(--textColor2)',
      yellowBank: 'var(--yellowBank)',
    }
  },
  plugins: [],
});

