import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});




export const metadata: Metadata = {
  title: "Saloon Booking System",
  description: "Saloon Booking System built with Next.js, Supabase, and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body className={lato.variable}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
