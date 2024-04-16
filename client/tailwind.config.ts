import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#4D11D7",
                secondary: "#D25022",
                background: "#1A1A1A",
                card: "#2A2A2A",
                'card-light': "#3A3A3A",
                text: "#DEDEDE",
                muted: "#7C7C7C",
            }
        },
    },
    plugins: [],
};
export default config;
