/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* KEMET chrome palette (design.md) — candlelight on night stone */
        kemet: {
          ink: "var(--kemet-ink)",
          "ink-2": "var(--kemet-ink-2)",
          bone: "var(--kemet-bone)",
          "bone-dim": "var(--kemet-bone-dim)",
          taupe: "var(--kemet-taupe)",
          gold: "var(--kemet-gold)",
          "gold-hi": "var(--kemet-gold-hi)",
          ember: "var(--kemet-ember)",
          moon: "var(--kemet-moon)",
          star: "var(--kemet-star)",
        },
      },
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
        cormorant: ["'Cormorant Garamond'", "serif"],
        archivo: ["Archivo", "sans-serif"],
        glyphs: ["'Noto Sans Egyptian Hieroglyphs'", "sans-serif"],
      },
      transitionTimingFunction: {
        sacred: "cubic-bezier(0.22, 1, 0.36, 1)",
        ritual: "cubic-bezier(0.625, 0.05, 0, 1)",
        tomb: "cubic-bezier(0.16, 1, 0.3, 1)",
        stone: "cubic-bezier(0.7, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
