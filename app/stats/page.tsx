// SERVER COMPONENT — "use client" nahi
// Sirf StatsContent render karta hai
// Routing ke liye — Next.js ka rule

import StatsContent from "@/components/StatsContent";
import Link from "next/link";

export default function StatsPage() {
  return (
    <main
      className={[
        "min-h-screen px-4 py-8 sm:px-6 lg:px-8",
        "transition-colors duration-300",
        "bg-slate-50 dark:bg-slate-950",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <section className="mb-8 flex flex-col gap-4
                            sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em]
                          text-cyan-600 dark:text-cyan-300">
              Analytics
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight
                           text-slate-900 dark:text-white sm:text-5xl">
              Task Statistics
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Overview of all your tasks and progress.
            </p>
          </div>

          <Link
            href="/tasks"
            className={[
              "w-fit rounded-xl px-5 py-3 font-semibold transition text-sm",
              "bg-cyan-500 dark:bg-cyan-400",
              "text-white dark:text-slate-950",
              "hover:bg-cyan-400 dark:hover:bg-cyan-300",
            ].join(" ")}
          >
            ← Back to Tasks
          </Link>
        </section>

        {/* STATS CONTENT */}
        <StatsContent />

      </div>
    </main>
  );
}