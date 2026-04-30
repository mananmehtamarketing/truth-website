import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        truth: {
          black: "#010101",
          ink: "#0a0606",
          gold: "#c9a96b",
          goldDeep: "#8a6a30",
          neon: "#ff2d2d",
          ember: "#ff6e3a",
          bone: "#f4eadd",
          sand: "#d8c7a3",
        },
      },
      fontFamily: {
        display: ["var(--font-bonyland)", "serif"],
        body: ["var(--font-jost)", "sans-serif"],
      },
      keyframes: {
        flicker: {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": {
            opacity: "0.99",
            filter:
              "drop-shadow(0 0 1px #ff2d2d) drop-shadow(0 0 8px #ff2d2d) drop-shadow(0 0 18px #ff2d2d)",
          },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": {
            opacity: "0.4",
            filter: "drop-shadow(0 0 1px #ff2d2d)",
          },
        },
        floatY: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glowPulse: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(201,169,107,0)" },
          "50%": { boxShadow: "0 0 32px 4px rgba(201,169,107,0.45)" },
        },
        scrollHint: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "60%": { transform: "translateY(8px)", opacity: "0.4" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        flicker: "flicker 4s linear infinite",
        floatY: "floatY 6s ease-in-out infinite",
        glowPulse: "glowPulse 3s ease-in-out infinite",
        scrollHint: "scrollHint 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
