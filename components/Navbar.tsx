"use client";

import { useState } from "react";
import Link from "next/link";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={[
        "sticky top-0 z-50 backdrop-blur",
        "transition-colors duration-300",
        "border-b",
        "border-slate-200 dark:border-slate-800",
        "bg-white/90 dark:bg-slate-950/90",
      ].join(" ")}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors"
        >
          TaskFlow
        </Link>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 text-sm font-medium">
            {[
              { href: "/", label: "Home" },
              { href: "/tasks", label: "Tasks" },
              { href: "/stats", label: "Stats" },
              { href: "/#about", label: "About" },
            ].map((link: { href: string; label: string }) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "rounded-full px-4 py-2 transition-colors",
                  "text-slate-600 dark:text-slate-300",
                  "hover:bg-slate-100 dark:hover:bg-slate-800",
                  "hover:text-slate-900 dark:hover:text-white",
                ].join(" ")}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={[
              "rounded-full p-2 transition-colors",
              "text-slate-600 dark:text-slate-300",
              "hover:bg-slate-100 dark:hover:bg-slate-800",
              "hover:text-slate-900 dark:hover:text-white",
            ].join(" ")}
          >
            {theme === "dark" ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
            className={[
              "sm:hidden rounded-full p-2 transition-colors",
              "text-slate-600 dark:text-slate-300",
              "hover:bg-slate-100 dark:hover:bg-slate-800",
              "hover:text-slate-900 dark:hover:text-white",
            ].join(" ")}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={[
            "sm:hidden border-t px-4 py-4",
            "border-slate-200 dark:border-slate-800",
            "bg-white dark:bg-slate-950",
          ].join(" ")}
        >
          <div className="flex flex-col gap-2 text-sm font-medium">
            {[
              { href: "/", label: "Home" },
              { href: "/tasks", label: "Tasks" },
              { href: "/#about", label: "About" },
            ].map((link: { href: string; label: string }) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={[
                  "rounded-xl px-4 py-3 transition-colors",
                  "text-slate-600 dark:text-slate-300",
                  "hover:bg-slate-100 dark:hover:bg-slate-800",
                  "hover:text-slate-900 dark:hover:text-white",
                ].join(" ")}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}