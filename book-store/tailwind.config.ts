import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        '297': '297px', 
      },
      backgroundColor:{
        'orange':'rgba(239, 107, 74, 1)',
        'orange-light':'rgba(239, 107, 74, .7)',
        'welcome': 'rgba(29, 29, 78, 1)',
      }
    },
  },
  plugins: [],
};
export default config;
