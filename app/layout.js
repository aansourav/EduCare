import { Toaster } from "@/components/ui/sonner";
import { connectDB } from "@/database/connection";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
const poppins = Inter({ subsets: ["latin"], variable: "--font-poppins" });

export const metadata = {
    title: "EduConnect - Wold's Best Learning Platform",
    description: "Explore || Learn || Build || Share",
};

export default async function RootLayout({ children }) {
    const connection = await connectDB();
    return (
        <html lang="en">
            <body className={cn(inter.className, poppins.className)}>
                {children}
                <Toaster richColors position="top-center" />
            </body>
        </html>
    );
}
