import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "VK Creations | Vishnu Gurjar",
  description:
    "Explore the creative portfolio of Vishnu Gurjar — Graphic Designer and Full Stack Developer. Discover creative designs and modern web experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#171321]">
        {children}
      </body>
    </html>
  );
}