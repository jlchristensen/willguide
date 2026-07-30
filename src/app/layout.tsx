import type { Metadata } from "next";
import { Source_Serif_4, Inter } from "next/font/google";
import "./globals.css";

const display = Source_Serif_4({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WillGuide — A clear, guided draft will and estate plan",
  description:
    "Answer plain-language questions and leave with an organized draft will, estate summary, and signing checklist. Educational drafting — not a law firm.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
