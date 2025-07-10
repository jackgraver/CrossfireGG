import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import NavBar from "@/shared/NavBar";
import Footer from "@/shared/Footer";

export const metadata: Metadata = {
    title: "OSS Season 8",
    description: "Off Season Schenanigans",
    icons: { icon: "/OSSLOGO.ico" },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="flex min-h-screen flex-col">
                <Providers>
                    <NavBar />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
