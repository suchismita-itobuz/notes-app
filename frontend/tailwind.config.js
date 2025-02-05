/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        first_bp:"375px",
        second_bp: "425px", 
      },
    },
  },
  plugins: [],
}
