/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--clr-primary)",
          100: "var(--clr-primary-10)"
        },
      },
    },
  },
  plugins: [],
};
