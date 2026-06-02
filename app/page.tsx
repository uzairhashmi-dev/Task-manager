import Link from "next/link";

export default function HomePage() {
  return (
    <main
      className={[
        "min-h-screen px-4 py-16 sm:px-6 lg:px-8",
        "transition-colors duration-300",
        "bg-slate-50 dark:bg-slate-950",
        "text-slate-900 dark:text-white",
      ].join(" ")}
    >
      {/* ── HERO SECTION */}
      <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        
        {/* LEFT — Text */}
        <div>
          <span
            className={[
              "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
              "bg-cyan-50 dark:bg-cyan-400/10",
              "text-cyan-600 dark:text-cyan-300",
              "border border-cyan-200 dark:border-cyan-400/20",
            ].join(" ")}
          >
            ✦ Next.js + TypeScript Task Manager Project
          </span>

          <h1
            className={[
              "mt-5 text-4xl font-bold tracking-tight sm:text-6xl",
              "text-slate-900 dark:text-white",
            ].join(" ")}
          >
            Manage your tasks{" "}
            <span className="text-cyan-500 dark:text-cyan-400">
              smarter.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500 dark:text-slate-400">
            A full-featured task manager built with Next.js, TypeScript, and
            Tailwind CSS. Create tasks, track progress, filter by category,
            and visualize your productivity,and complet dynamic routing.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tasks"
              className={[
                "rounded-xl px-6 py-3 text-center font-semibold transition",
                "bg-cyan-500 dark:bg-cyan-400",
                "text-white dark:text-slate-950",
                "hover:bg-cyan-400 dark:hover:bg-cyan-300",
              ].join(" ")}
            >
              Open Task Manager →
            </Link>

            <Link
              href="/stats"
              className={[
                "rounded-xl border px-6 py-3 text-center font-semibold transition",
                "border-slate-300 dark:border-slate-700",
                "text-slate-700 dark:text-slate-200",
                "hover:bg-slate-100 dark:hover:bg-slate-900",
              ].join(" ")}
            >
              View Stats
            </Link>
          </div>

          {/* QUICK STATS ROW */}
          <div className="mt-10 flex flex-wrap gap-6">
            {[
              { label: "Task Priorities", value: "3 Levels" },
              { label: "Categories", value: "4 Types" },
              { label: "Storage", value: "Local" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {item.value}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Dashboard Preview Card */}
        <div
          className={[
            "rounded-3xl border p-6 shadow-2xl transition-colors duration-300",
            "border-slate-200 dark:border-slate-800",
            "bg-white/70 dark:bg-slate-900/70",
            "shadow-slate-200/50 dark:shadow-cyan-950/20",
          ].join(" ")}
        >
          <div
            className={[
              "rounded-2xl p-5 transition-colors duration-300",
              "bg-slate-50 dark:bg-slate-950",
            ].join(" ")}
          >
            {/* Preview Header */}
            <div
              className={[
                "flex items-center justify-between border-b pb-4",
                "border-slate-200 dark:border-slate-800",
              ].join(" ")}
            >
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Dashboard
                </p>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Task Overview
                </h2>
              </div>
              <span
                className={[
                  "rounded-full px-3 py-1 text-xs font-medium",
                  "bg-emerald-50 dark:bg-emerald-400/10",
                  "text-emerald-600 dark:text-emerald-300",
                  "border border-emerald-200 dark:border-emerald-400/20",
                ].join(" ")}
              >
                ● Live
              </span>
            </div>

            {/* Mini Stats */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { label: "Total", value: "8", color: "text-slate-900 dark:text-white" },
                { label: "Done", value: "5", color: "text-emerald-600 dark:text-emerald-400" },
                { label: "Active", value: "3", color: "text-cyan-600 dark:text-cyan-400" },
              ].map((s) => (
                <div
                  key={s.label}
                  className={[
                    "rounded-xl p-3 text-center",
                    "bg-white dark:bg-slate-900",
                    "border border-slate-200 dark:border-slate-800",
                  ].join(" ")}
                >
                  <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Preview Tasks */}
            <div className="mt-4 space-y-3">
              {[
                { title: "Design UI", category: "Work", priority: "high", done: true },
                { title: "Add TypeScript types", category: "Study", priority: "medium", done: true },
                { title: "Setup localStorage", category: "Work", priority: "low", done: false },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className={[
                    "rounded-xl border p-3 transition-colors",
                    "border-slate-200 dark:border-slate-800",
                    "bg-white dark:bg-slate-900",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {/* Checkbox style */}
                      <div
                        className={[
                          "w-4 h-4 rounded-full border-2 flex-shrink-0",
                          item.done
                            ? "bg-emerald-500 border-emerald-500"
                            : "border-slate-300 dark:border-slate-600",
                        ].join(" ")}
                      />
                      <h3
                        className={[
                          "text-sm font-medium truncate",
                          item.done
                            ? "line-through text-slate-400 dark:text-slate-500"
                            : "text-slate-900 dark:text-white",
                        ].join(" ")}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <span
                      className={[
                        "text-xs px-2 py-0.5 rounded-full flex-shrink-0",
                        item.priority === "high"
                          ? "bg-rose-50 text-rose-600 dark:bg-rose-400/10 dark:text-rose-300"
                          : item.priority === "medium"
                          ? "bg-amber-50 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300"
                          : "bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300",
                      ].join(" ")}
                    >
                      {item.priority}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-2 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className={[
                        "h-1.5 rounded-full",
                        item.done ? "bg-emerald-500" : "bg-cyan-500 dark:bg-cyan-400",
                      ].join(" ")}
                      style={{ width: `${(index + 1) * 28}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ─────────────────────── */}
      <section id="about" className="mx-auto mt-24 max-w-7xl">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-300">
            What You Learn
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            Concepts practiced in this project
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: "🔷",
              title: "TypeScript Types",
              desc: "Union types, type aliases, typed props, generics with useState and typed event handlers.",
            },
            {
              icon: "⚡",
              title: "React State & Events",
              desc: "useState, useEffect, useMemo, controlled inputs, prop drilling, and callback patterns.",
            },
            {
              icon: "🎨",
              title: "Tailwind CSS",
              desc: "Responsive grid, dark mode with class strategy, conditional classes, and smooth transitions.",
            },
            {
              icon: "🗂️",
              title: "Next.js Routing",
              desc: "File-based routing, layouts, server vs client components, and the use client directive.",
            },
            {
              icon: "💾",
              title: "localStorage",
              desc: "Persist data across sessions, handle server-side checks, and backwards compatibility.",
            },
            {
              icon: "🧩",
              title: "Component Design",
              desc: "Reusable components, separation of concerns, Context API for theme management.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className={[
                "rounded-2xl border p-6 transition-colors duration-300",
                "border-slate-200 dark:border-slate-800",
                "bg-white dark:bg-slate-900/60",
                "hover:border-cyan-300 dark:hover:border-cyan-400/30",
                "hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50",
              ].join(" ")}
            >
              <span className="text-2xl">{item.icon}</span>
              <h3 className="mt-3 text-base font-semibold text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────── */}
      <section className="mx-auto mt-20 max-w-7xl">
        <div
          className={[
            "rounded-3xl border p-10 text-center transition-colors duration-300",
            "border-slate-200 dark:border-slate-800",
            "bg-white dark:bg-slate-900/60",
          ].join(" ")}
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Ready to get started?
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Start adding tasks and track your productivity.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/tasks"
              className={[
                "rounded-xl px-8 py-3 font-semibold transition",
                "bg-cyan-500 dark:bg-cyan-400",
                "text-white dark:text-slate-950",
                "hover:bg-cyan-400 dark:hover:bg-cyan-300",
              ].join(" ")}
            >
              Open Task Manager
            </Link>
            <Link
              href="/stats"
              className={[
                "rounded-xl border px-8 py-3 font-semibold transition",
                "border-slate-300 dark:border-slate-700",
                "text-slate-700 dark:text-slate-200",
                "hover:bg-slate-100 dark:hover:bg-slate-900",
              ].join(" ")}
            >
              View Statistics
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}