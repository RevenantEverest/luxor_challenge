import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { Toaster } from 'react-hot-toast';
import { StoreProvider } from '@@providers';
import Navbar from '@@navigation/Navbar';
import AuthVerify from '@@components/Auth/AuthVerify';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Luxor Challenge",
    description: "Full Stack Coding Challenge",
};

function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en">
            <body className={inter.className + " bg-background text-text"}>
                <StoreProvider>
                    <Navbar />
                    <main>
                        {children}
                    </main>
                    <AuthVerify />
                </StoreProvider>
                <Toaster 
                    position="top-right"
                    toastOptions={{
                        style: {
                            border: "none",
                            background: "transparent",
                            boxShadow: "none",
                            maxWidth: "98%"
                        }
                    }}    
                />
            </body>
        </html>
    );
};

export default RootLayout;
