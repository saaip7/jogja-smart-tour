import type { Config } from "tailwindcss";

export default {
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
        'neutral-100': '#fff',
        'neutral-300': '#DEDEDE',
        'neutral-500': '#B9B9B9',
        'neutral-700': '#797979',
        'neutral-900': '#2A2A2A',
        'primary-100': '#DBE9F2',
        'primary-300': '#80B8DD',
        'primary-500': '#0072BB',
        'primary-700': '#004C7D',
        'primary-900': '#00263E',
        'secondary-100': '#D1EAEC',
        'secondary-300': '#C2E4E6',
        'secondary-500': '#A3D6D9',
        'secondary-700': '#88B2B5',
        'secondary-900': '#6D8F91',
        
      },
    },
  },
  plugins: [],
} satisfies Config;
