/** @type {import('tailwindcss').Config} */
export default {
   safelist: [
    'text-amber-500',
    'text-amber-600',
    'text-slate-500',
    'text-slate-600',
    'text-teal-500',
    'text-teal-600'
    // add other shades if needed
  ],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};