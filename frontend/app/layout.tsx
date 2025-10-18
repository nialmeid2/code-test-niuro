

import { ReactNode } from "react";
import "./globals.css";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Movie Library Online",
    description: "Search your favorite movies here",
    keywords: ['movies', 'favorites', 'search'],
    icons: "/icon.svg"
};

export default function RootLayout({children} : {
    children: ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto+Slab:wght@100..900&display=swap');
                </style>
            </head>
            <body
                className={`antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
