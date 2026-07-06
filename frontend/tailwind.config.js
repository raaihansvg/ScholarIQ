const withOpacity = (variable) => ({ opacityValue }) => {
  if (opacityValue === undefined) return `var(${variable})`;
  return `color-mix(in oklch, var(${variable}) ${Number(opacityValue) * 100}%, transparent)`;
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: withOpacity("--background"),
        foreground: withOpacity("--foreground"),
        card: {
          DEFAULT: withOpacity("--card"),
          foreground: withOpacity("--card-foreground"),
        },
        popover: {
          DEFAULT: withOpacity("--popover"),
          foreground: withOpacity("--popover-foreground"),
        },
        primary: {
          DEFAULT: withOpacity("--primary"),
          foreground: withOpacity("--primary-foreground"),
        },
        secondary: {
          DEFAULT: withOpacity("--secondary"),
          foreground: withOpacity("--secondary-foreground"),
        },
        muted: {
          DEFAULT: withOpacity("--muted"),
          foreground: withOpacity("--muted-foreground"),
        },
        accent: {
          DEFAULT: withOpacity("--accent"),
          foreground: withOpacity("--accent-foreground"),
        },
        destructive: withOpacity("--destructive"),
        border: withOpacity("--border"),
        input: withOpacity("--input"),
        ring: withOpacity("--ring"),
        ink: {
          950: "#0A0E1F",
          900: "#0F1530",
          800: "#171F42",
          700: "#232D57",
          600: "#333F73",
        },
        mist: {
          50: "#F7F8FC",
          100: "#EEF0F9",
          200: "#E2E5F3",
        },
        brand: {
          indigo: "#4F46E5",
          indigoDark: "#372FA6",
          cyan: "#06B6D4",
          cyanLight: "#22D3EE",
          violet: "#8B5CF6",
          violetLight: "#A78BFA",
          amber: "#F59E0B",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(120% 120% at 10% 0%, #372FA6 0%, #232D57 45%, #0A0E1F 100%)",
        aurora: "linear-gradient(135deg, #4F46E5 0%, #8B5CF6 50%, #06B6D4 100%)",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(79, 70, 229, 0.45)",
        card: "0 20px 60px -20px rgba(15, 21, 48, 0.25)",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-4px)" },
          "40%": { transform: "translateX(4px)" },
          "60%": { transform: "translateX(-3px)" },
          "80%": { transform: "translateX(3px)" },
        },
      },
      animation: {
        shake: "shake 0.4s ease-in-out",
      },
    },
  },
  plugins: [],
};
