/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ".flowbite-react\\class-list.json",
  ],
  theme: {
    extend: {
      animation: {
        "flip-vertical-left": "flip-vertical-left .5s ease-in-out both",
        ping: "ping 0.6s cubic-bezier(0, 0, 0.2, 1)",
      },
      perspective: {
        1000: "1000px",
      },
      rotate: {
        "y-180": "rotateY(180deg)",
      },
      transformStyle: {
        "preserve-3d": "preserve-3d",
      },
      backfaceVisibility: {
        hidden: "hidden",
      },
      keyframes: {
        "flip-vertical-left": {
          "0%": {
            transform: "rotateY(0)",
          },
          to: {
            transform: "rotateY(-180deg)",
          },
        },
      },
      colors: {
        primary: "#fcaf17",
        "color-brand-surface": "#ffc84a",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".backface-hidden": {
          "backface-visibility": "hidden",
        },
        ".rotate-y-0": {
          transform: "rotateY(0deg)",
        },
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
        ".transform-style-preserve-3d": {
          "transform-style": "preserve-3d",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
