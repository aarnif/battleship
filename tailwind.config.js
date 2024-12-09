/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        body: "#a7f3d0", // Light emerald (matches Tailwind's emerald-200)
        bodyText: "#064e3b", // Very dark emerald (matches Tailwind's emerald-900)
        header: "#34d399", // Dark emerald (matches Tailwind's emerald-600)
        ship: "#10B981", // Vibrant emerald (matches Tailwind's emerald-500)
        cell: {
          DEFAULT: "#6EE7B7", // Soft emerald (matches Tailwind's emerald-300)
          hover: "#34d399", // Brighter emerald (matches Tailwind's emerald-400)
          hit: "#EF4444", // Red (matches Tailwind's red-500)
          miss: "#FCD34D", // Yellow (matches Tailwind's yellow-400)
        },
        shipCell: {
          DEFAULT: "#059669", // Bold emerald (matches Tailwind's emerald-600)
          hover: "#065F46", // Darker emerald (matches Tailwind's emerald-700)
        },
        button: {
          DEFAULT: "#a7f3d0", // Bright emerald (matches Tailwind's emerald-200)
          hover: "#6EE7B7", // Soft emerald (matches Tailwind's emerald-300)
        },
        border: "#022c22", // Dark emerald (matches Tailwind's emerald-950)
        footer: "#34d399", // Dark emerald (matches Tailwind's emerald-600)
        overlay: "rgba(0, 0, 0, 0.7)", // Backdrop color (semi-transparent black)
        modal: "#a7f3d0", // Brighter emerald (matches Tailwind's emerald-200)
      },
    },
  },
  plugins: [],
};
