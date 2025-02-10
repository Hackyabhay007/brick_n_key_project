import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
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
        bgColor: "#f1efe7",
        bgBlue: "#142738",
        bgRed: "#ED371C",
        textGray: "#8F90A6",
        textDark: "#110229",
        overlayBlack: "rgba(0, 0, 0, 0.5)",
        overlayWhite: "rgba(255, 255, 255, 0.85)",
        whiteAlpha10: "rgba(255, 255, 255, 0.1)",
        whiteAlpha20: "rgba(255, 255, 255, 0.2)",
      },
      aspectRatio: {
        'w-16': '16',
        'h-9': '9',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
} satisfies Config;
