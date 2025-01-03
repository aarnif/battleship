/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        rotateAndScale: {
          "0%": { opacity: "0", transform: "rotate(0) scale(1)" },
          "100%": { opacity: "1", transform: "rotate(360deg) scale(1.5)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "scale-in": "scaleIn 0.3s ease-in-out",
        "rotate-and-scale": "rotateAndScale 0.5s ease-in-out forwards",
      },
      colors: {
        body: "#a7f3d0", // Light emerald (matches Tailwind's emerald-200)
        bodyText: "#064e3b", // Very dark emerald (matches Tailwind's emerald-900)
        header: "#34d399", // Dark emerald (matches Tailwind's emerald-600)
        ship: "#10B981", // Vibrant emerald (matches Tailwind's emerald-500)
        "ship-icon": {
          DEFAULT: "#065F46", // Vibrant emerald (matches Tailwind's emerald-800)
          sunk: "#b91c1c", // Red (matches Tailwind's red-700)
        },
        cell: {
          DEFAULT: "#6EE7B7", // Soft emerald (matches Tailwind's emerald-300)
          hover: "#34d399", // Brighter emerald (matches Tailwind's emerald-400)
          hit: "#EF4444", // Red (matches Tailwind's red-500)
          miss: "#FCD34D", // Yellow (matches Tailwind's yellow-400)
        },
        "ship-cell": {
          DEFAULT: "#10B981", // Bold emerald (matches Tailwind's emerald-500)
          hover: "#34d399", // Darker emerald (matches Tailwind's emerald-600)
        },
        button: {
          DEFAULT: "#a7f3d0", // Bright emerald (matches Tailwind's emerald-200)
          hover: "#6EE7B7", // Soft emerald (matches Tailwind's emerald-300)
        },
        border: "#022c22", // Dark emerald (matches Tailwind's emerald-950)
        footer: "#34d399", // Dark emerald (matches Tailwind's emerald-600)
        overlay: "rgba(0, 0, 0, 0.7)", // Backdrop color (semi-transparent black)
        modal: "#a7f3d0", // Brighter emerald (matches Tailwind's emerald-200)
        "aim-cursor": {
          DEFAULT: "#047857", // Dark emerald (matches Tailwind's emerald-700)
          played: "#b91c1c", // Dark Red (matches Tailwind's red-700)
        },
        "aim-cursor-center": {
          DEFAULT: "#ef4444", // Red (matches Tailwind's red-500)
          played: "#b91c1c", // Dark Red (matches Tailwind's red-700)
        },
      },
    },
  },
  plugins: [],
};
