import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider"; 
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskFlow - Task Manager",
  description: "A Next.js and TypeScript task manager dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      // "dark" default class — pehli render dark hogi
      // ThemeProvider localStorage check karke update karega
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body
        className={[
          "min-h-screen antialiased",
          "transition-colors duration-300", // smooth color transition
          "bg-slate-50 dark:bg-slate-950",  // LIGHT: slate-50 | DARK: slate-950
        ].join(" ")}
      >
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}