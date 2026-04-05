import type { Metadata } from "next";
import "./globals.css";
import { Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const spaceMono = Space_Mono({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: "AG-DEsk",
  description: "AG-DEsk Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-mono", spaceMono.variable)}>
      <body>{children}</body>
    </html>
  );
}
