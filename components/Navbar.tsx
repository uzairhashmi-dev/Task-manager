"use client";

import { useState } from "react";
import Link from "next/link";
import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import type { TaskCategory } from "@/types/task";

// Categories list — ek jagah define karo
const CATEGORIES: { label: string; value: TaskCategory }[] = [
  { label: "Work", value: "work" },
  { label: "Personal", value: "personal" },
  { label: "Study", value: "study" },
  { label: "Other", value: "other" },
];

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tasks", label: "Tasks" },
  { href: "/stats", label: "Stats" },
  { href: "/#about", label: "About" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isCatOpen, setIsCatOpen] = useState(false);

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
          className="text-2xl font-bold tracking-tight
                     text-slate-900 dark:text-white transition-colors"
        >
          TaskFlow
        </Link>

        <div className="flex items-center gap-2">

          {/* ── DESKTOP LINKS */}
          <div className="hidden sm:flex items-center gap-1 text-sm font-medium">

            {NAV_LINKS.map((link) => (
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

            {/* ── CATEGORIES DROPDOWN — DESKTOP ── */}
            {/* group → hover pe child visible hoga */}
            <div className="relative group">
              <button
                type="button"
                className={[
                  "flex items-center gap-1 rounded-full px-4 py-2",
                  "transition-colors text-sm font-medium",
                  "text-slate-600 dark:text-slate-300",
                  "hover:bg-slate-100 dark:hover:bg-slate-800",
                  "hover:text-slate-900 dark:hover:text-white",
                ].join(" ")}
              >
                Categories
                <ChevronDown
                  size={14}
                  className="transition-transform duration-200
                             group-hover:rotate-180"
                />
              </button>

              {/* opacity-0 invisible → hidden by default
                  Pure CSS — no useState needed desktop pe */}
              <div
                className={[
                  "absolute top-full left-0 mt-2 w-40",
                  "rounded-xl border p-1.5 z-50",
                  // Visibility — CSS se toggle
                  "opacity-0 invisible",
                  "group-hover:opacity-100 group-hover:visible",
                  "transition-all duration-200",
                  // Colors
                  "bg-white dark:bg-slate-900",
                  "border-slate-200 dark:border-slate-800",
                  "shadow-lg shadow-slate-200/50 dark:shadow-slate-950/50",
                ].join(" ")}
              >
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.value}
                    href={`/tasks/category/${cat.value}`}
                    // ↑ Dynamic URL — category page pe jaao
                    className={[
                      "flex items-center gap-2 rounded-lg px-3 py-2",
                      "text-sm font-medium capitalize transition-colors",
                      "text-slate-600 dark:text-slate-300",
                      "hover:bg-slate-50 dark:hover:bg-slate-800",
                      "hover:text-slate-900 dark:hover:text-white",
                    ].join(" ")}
                  >
                    {/* Category color dot */}
                    <span
                      className={[
                        "w-2 h-2 rounded-full flex-shrink-0",
                        cat.value === "work" && "bg-blue-500",
                        cat.value === "personal" && "bg-purple-500",
                        cat.value === "study" && "bg-amber-500",
                        cat.value === "other" && "bg-slate-400",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    />
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* ── THEME TOGGLE ───────────────────── */}
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
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* ── MOBILE HAMBURGER  */}
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

      {/* ── MOBILE MENU ──────────────────────────── */}
      {isOpen && (
        <div
          className={[
            "sm:hidden border-t px-4 py-4",
            "border-slate-200 dark:border-slate-800",
            "bg-white dark:bg-slate-950",
          ].join(" ")}
        >
          <div className="flex flex-col gap-1 text-sm font-medium">

            {/* Normal Links */}
            {NAV_LINKS.map((link) => (
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

            {/* Mobile pe useState se toggle karenge */}
            <button
              type="button"
              onClick={() => setIsCatOpen(!isCatOpen)}
              className={[
                "flex items-center justify-between rounded-xl px-4 py-3",
                "transition-colors text-left",
                "text-slate-600 dark:text-slate-300",
                "hover:bg-slate-100 dark:hover:bg-slate-800",
                "hover:text-slate-900 dark:hover:text-white",
              ].join(" ")}
            >
              <span>Categories</span>
              <ChevronDown
                size={14}
                className={[
                  "transition-transform duration-200",
                  isCatOpen ? "rotate-180" : "",
                ].join(" ")}
              />
            </button>

            {/* Mobile Category Links */}
            {isCatOpen && (
              <div className="ml-4 flex flex-col gap-1">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.value}
                    href={`/tasks/category/${cat.value}`}
                    onClick={() => {
                      setIsOpen(false);
                      setIsCatOpen(false);
                      // Dono close karo navigate hone pe
                    }}
                    className={[
                      "flex items-center gap-2 rounded-xl px-4 py-2.5",
                      "transition-colors capitalize",
                      "text-slate-600 dark:text-slate-300",
                      "hover:bg-slate-100 dark:hover:bg-slate-800",
                      "hover:text-slate-900 dark:hover:text-white",
                    ].join(" ")}
                  >
                    {/* Color dot */}
                    <span
                      className={[
                        "w-2 h-2 rounded-full flex-shrink-0",
                        cat.value === "work" && "bg-blue-500",
                        cat.value === "personal" && "bg-purple-500",
                        cat.value === "study" && "bg-amber-500",
                        cat.value === "other" && "bg-slate-400",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    />
                    {cat.label}
                  </Link>
                ))}
              </div>
            )}

          </div>
        </div>
      )}
    </header>
  );
}