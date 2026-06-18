/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        ink: "#17202a",
        ember: "#d94f30",
        mint: "#17a589",
        saffron: "#f4b942",
        cloud: "#f7f9fb"
      },
      boxShadow: {
        panel: "0 18px 45px rgba(23, 32, 42, 0.12)"
      }
    }
  },
  plugins: []
};
