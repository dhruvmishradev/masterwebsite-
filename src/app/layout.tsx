import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dhruv Mishra — AI & ML Developer",
  description:
    "Portfolio of Dhruv Mishra, B.Tech CSE (AI & ML) student at GLA University. Building intelligent RAG applications, multi-agent systems, and robust FastAPI backends.",
  keywords: [
    "Dhruv Mishra",
    "GLA University",
    "AI Developer",
    "Machine Learning",
    "Generative AI",
    "RAG",
    "FastAPI",
    "Next.js",
  ],
  authors: [{ name: "Dhruv Mishra" }],
  creator: "Dhruv Mishra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <body className="bg-[#030303] text-[#fafafa] font-sans min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
