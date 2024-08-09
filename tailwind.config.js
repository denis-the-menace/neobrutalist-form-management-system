/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-peach": "var(--color-light-peach)",
        "pale-yellow": "var(--color-pale-yellow)",
        "bright-orange": "var(--color-bright-orange)",
        "primary-dark": "var(--color-primary-dark)",
        "primary-light": "var(--color-primary-light)",
        "secondary": "var(--color-secondary)",
        "light-pink": "var(--color-light-pink)",
        "dark-pink": "var(--color-dark-pink)",
        "light-blue": "var(--color-light-blue)",
        "dark-blue": "var(--color-dark-blue)",
        "light-red": "var(--color-light-red)",
        "dark-red": "var(--color-dark-red)",
        "light-green": "var(--color-light-green)",
        "dark-green": "var(--color-dark-green)",
      },
    },
  },
  plugins: [],
};
