/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        AlfaSlabOne: ['Alfa Slab One', 'serif'],
        Poppins: ['Poppins', 'sans-serif'],
        Sansita: ['Sansita', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-blue': 'linear-gradient(180deg, #3ABDFF 0%, #0C4FFA 100%)'
      },
    }
  },
  plugins: [],
};
