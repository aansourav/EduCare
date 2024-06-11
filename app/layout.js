import { Toaster } from "@/components/ui/sonner";
import { connectDB } from "@/database/connection";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const poppins = Inter({ subsets: ["latin"], variable: "--font-poppins" });

export const metadata = {
    title: "EduCare",
    description: "Online Course Platform for Everyone 🚀",
};

export default async function RootLayout({ children }) {
    const connection = await connectDB();
    // console.log(connection);
    return (
        <html lang="en">
            <body className={cn(inter.className, poppins.className)}>
                {children}
                <Toaster richColors position="top-center" />
            </body>
        </html>
    );
}
