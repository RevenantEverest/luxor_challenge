import type { Config } from 'tailwindcss';
import Flowbite from 'flowbite-react/tailwind';

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/navigation/**/*.{js,ts,jsx,tsx,mdx}",
        Flowbite.content()
    ],
    theme: {
        extend: {
            colors: {
                primary: "#D25022",
                secondary: "#4D11D7",
                background: "#1A1A1A",
                card: "#2A2A2A",
                'card-light': "#3A3A3A",
                text: "#DEDEDE",
                muted: "#7C7C7C",
            }
        },
    },
    plugins: [Flowbite.plugin()],
};

export default config;
