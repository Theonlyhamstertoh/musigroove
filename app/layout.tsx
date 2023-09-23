import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { link } from "fs";

import { Analytics } from "@vercel/analytics/react";
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
    title: "Musigroove",
    description: "Add timestamps to your spotify song for easy dancing",
    icons: {
        icon: "/groove.png",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={cn(poppins.className, "h-screen")}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                </ThemeProvider>
                <Toaster />
                <footer className="text-center p-2 flex gap-3  items-center justify-center border-t border-secondary text-sm w-full ">
                    ©️ Created by
                    <Button variant={"secondary"} asChild>
                        <Link href="https://weibozhang.com" target="_blank">
                            weibozhang.com
                        </Link>
                    </Button>
                </footer>
                <Analytics />
            </body>
        </html>
    );
}
