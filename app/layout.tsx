
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

import type { Metadata } from "next";
import { getPageMetadata } from "@/app/lib/meta";

export async function generateMetadata(): Promise<Metadata> {

  const metadata = await getPageMetadata("home", "home");
  //console.log("Generated metadata:", metadata);
  return metadata;
  
}



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
