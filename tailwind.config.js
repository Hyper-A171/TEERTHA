/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./**/*.php"],
  theme: {
    extend: {
      colors: {
        "surface-container-high": "#e7e8e9",
        "surface-dim": "#d9dadb",
        "surface-bright": "#f8f9fa",
        "surface-tint": "#a63b00",
        "on-tertiary-fixed": "#2d1600",
        "on-error-container": "#93000a",
        "tertiary-fixed": "#ffdcc0",
        "on-secondary-fixed-variant": "#3d4756",
        "primary-fixed-dim": "#ffb599",
        "surface-container-lowest": "#ffffff",
        "on-tertiary-container": "#452400",
        "on-secondary-fixed": "#121c2a",
        "on-surface": "#191c1d",
        "secondary": "#555f6f",
        "on-error": "#ffffff",
        "tertiary-container": "#d97c00",
        "primary": "#a63b00",
        "inverse-primary": "#ffb599",
        "on-background": "#191c1d",
        "tertiary": "#8d4f00",
        "on-primary-container": "#531900",
        "error": "#ba1a1a",
        "primary-container": "#ff5e00",
        "surface": "#f8f9fa",
        "tertiary-fixed-dim": "#ffb876",
        "secondary-container": "#d6e0f3",
        "surface-container-low": "#f3f4f5",
        "secondary-fixed": "#d9e3f6",
        "background": "#f8f9fa",
        "error-container": "#ffdad6",
        "on-secondary": "#ffffff",
        "outline-variant": "#e4bfb1",
        "on-primary": "#ffffff",
        "inverse-on-surface": "#f0f1f2",
        "surface-variant": "#e1e3e4",
        "on-surface-variant": "#5b4137",
        "on-tertiary-fixed-variant": "#6b3b00",
        "outline": "#8f7065",
        "on-primary-fixed": "#370e00",
        "inverse-surface": "#2e3132",
        "on-tertiary": "#ffffff",
        "surface-container": "#edeeef",
        "secondary-fixed-dim": "#bdc7d9",
        "primary-fixed": "#ffdbce",
        "on-primary-fixed-variant": "#7f2b00",
        "on-secondary-container": "#596373",
        "surface-container-highest": "#e1e3e4",
        "temple-gold": "#D4AF37"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        unit: "8px",
        gutter: "24px",
        "margin-mobile": "20px",
        "margin-desktop": "64px",
        "container-max": "1280px"
      },
      fontFamily: {
        "headline-lg": ["Geist"],
        "label-md": ["Geist"],
        "body-lg": ["Geist"],
        "headline-sm": ["Geist"],
        "display-lg": ["Geist"],
        "display-lg-mobile": ["Geist"],
        "body-md": ["Geist"],
        "headline": ["Geist"],
        "display": ["Geist"],
        "body": ["Geist"],
        "label": ["Geist"],
        "cinzel": ["Cinzel", "serif"]
      },
      fontSize: {
        "headline-lg": ["32px", { lineHeight: "1.3", letterSpacing: "-0.02em", fontWeight: "600" }],
        "label-md": ["14px", { lineHeight: "1", letterSpacing: "0.02em", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "headline-sm": ["24px", { lineHeight: "1.4", fontWeight: "600" }],
        "display-lg": ["64px", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "700" }],
        "display-lg-mobile": ["40px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ]
}
