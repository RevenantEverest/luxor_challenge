import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Navbar from '../navigation/Navbar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Luxor Challenge",
    description: "Full Stack Coding Challenge",
};

function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en">
            <body className={inter.className + " bg-background text-text"}>
                <Navbar />
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
