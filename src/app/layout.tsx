import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Analytics} from "@vercel/analytics/next";
import {Suspense} from "react";
import {LanguageProvider} from "@/app/languages/LanguageProvider";
import {assistantName, description} from "../../config";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: assistantName,
    description,
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
