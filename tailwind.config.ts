import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#0ea5e9", // Sky 500
                secondary: "#64748b", // Slate 500
                background: "#0f172a", // Slate 900
                "background-alt": "#1e293b", // Slate 800
            },
            fontFamily: {
                heading: ["var(--font-heading)", "sans-serif"],
                body: ["var(--font-body)", "sans-serif"],
            }
        },
    },
    plugins: [],
};
export default config;
