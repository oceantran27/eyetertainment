/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "@/pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "@/components/**/*.{js,ts,jsx,tsx,mdx}",
    // "@/src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx,mdx,html}",
    "./src/pages/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/components/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/layouts/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/styles/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
