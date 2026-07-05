import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        petrol: "#0F6B6F",
        "deep-teal": "#0A4F52",
        graphite: "#1D2730",
        "open-green": "#2E9E5B",
        cloud: "#F7F8F6",
        paper: "#FCFCFA",
        slate: "#5F6B76",
        amber: "#C9831A",
        red: "#B54747",
        line: "#E6E9E6"
      },
      fontFamily: {
        sans: ["Inter", "Manrope", "system-ui", "-apple-system", "Segoe UI", "sans-serif"]
      },
      maxWidth: { site: "72rem" }
    }
  },
  plugins: []
};
export default config;
