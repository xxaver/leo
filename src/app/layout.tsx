import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Analytics} from "@vercel/analytics/next";
import {Suspense} from "react";
import {assistantName, description, schoolName} from "../../config";
import {LanguageProvider} from "@/app/languages/useTranslations";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const siteName = `${assistantName} - Chatbot des ${schoolName}`;

export const metadata: Metadata = {
    title: assistantName,
    description,
    openGraph: {
        type: "website",
        locale: "de_DE",
        url: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
        description,
        siteName, 
        images: [
            {
                url: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/logo.png`,
                alt: assistantName,
            }
        ]
    }
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
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    name: siteName,
                    url: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
                    logo: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/logo.png`,
                }).replace(/</g, '\\u003c'),
            }}
        />
        </body>
        </html>
    );
}
