"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

// Ye sirf PEHLI BAAR chalta hai — effect ki zarurat nahi
function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark"; // server check
  return (localStorage.getItem("taskflow-theme") as Theme) ?? "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {

  // useState(() => ...) — React khud call karta hai, ek baar
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  // Effect sirf DOM class update karta hai — koi setState nahi
  // theme state change hote hi html class update hogi
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]); 

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("taskflow-theme", next);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}