import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./components/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./views/**/*.{js,ts,jsx,tsx,mdx,css}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          "100": "#682F2F",
          "80": "#883E3E",
          "72": "#B05050",
          "50": "#E26767",
          "32": "#F87171",
          "16": "#F98D8D",
          "12": "#FAA0A0",
          "8": "#FCBEBE",
          "4": "#FDD3D3",
        },
        black: {
          "100": "#0C0F18",
          "80": "#0C0F18CC",
          "72": "#0C0F18B8",
          "50": "#0C0F1880",
          "32": "#0C0F1852",
          "16": "#0C0F1829",
          "12": "#0C0F181F",
          "8": "#0C0F1814",
          "4": "#0C0F180A",
        },
        white: {
          "100": "#FAFCFF",
          "80": "#FAFCFFCC",
          "72": "#FAFCFFB8",
          "50": "#FAFCFF80",
          "32": "#FAFCFF52",
          "16": "#FAFCFF29",
          "12": "#FAFCFF1F",
          "8": "#FAFCFF14",
          "4": "#FAFCFF0A",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
