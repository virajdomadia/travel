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
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                accent: "var(--accent)",
                background: "var(--background)",
                foreground: "var(--foreground)",
                "background-alt": "#1e293b", // Slate 800 - Keep for now or map to secondary background
            },
            backgroundSize: {
                '300%': '300%',
            },
            animation: {
                'gradient': 'gradient 8s linear infinite',
            },
            keyframes: {
                gradient: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                heading: ["var(--font-inter)", "sans-serif"],
                mono: ["var(--font-mono)", "monospace"],
            },
            borderRadius: {
                DEFAULT: "var(--radius)",
            }
        },
    },
    plugins: [],
};
export default config;
