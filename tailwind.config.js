/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ".flowbite-react\\class-list.json",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fcaf17",
        "color-brand-surface": "#ffc84a",
      },
    },
  },
  plugins: [],
};
