import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Analytics} from "@vercel/analytics/next";
import {Suspense} from "react";
import {LanguageProvider} from "@/app/languages/LanguageProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_ASSISTANT_NAME,
    description: "Der offizielle Chatbot des Gymnasium Weingartens",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Suspense>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </Suspense>
        <SpeedInsights/>
        <Analytics/>
        </body>
        </html>
    );
}
