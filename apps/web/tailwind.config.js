/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        greyish: {
          DEFAULT: "#F6F9FE",
        },
      },
      fontSize: {
        xxs: [
          "10px",
          {
            lineHeight: "0.8rem",
          },
        ],
      },
    },
  },
  plugins: [],
};
