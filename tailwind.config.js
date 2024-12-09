/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        body: "#a7f3d0", // Light emerald (matches Tailwind's emerald-200)
        bodyText: "#022c22", // Very dark emerald (matches Tailwind's emerald-950)
        header: "#059669", // Dark emerald (matches Tailwind's emerald-600)
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
          DEFAULT: "#059669", // Bright emerald (matches Tailwind's emerald-600)
          hover: "#047857", // Very dark emerald (matches Tailwind's emerald-700)
        },
        footer: "#059669", // Matches bodyText for consistency (Tailwind's emerald-900)
        overlay: "rgba(0, 0, 0, 0.7)", // Backdrop color (semi-transparent black)
        modal: "#34d399", // Brighter emerald (matches Tailwind's emerald-400)
      },
    },
  },
  plugins: [],
};
