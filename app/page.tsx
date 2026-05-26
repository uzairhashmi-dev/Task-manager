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
      <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        {/* LEFT — Text */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-300">
            TypeScript Practice Project
          </p>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl text-slate-900 dark:text-white">
            Build your task workflow with Next.js.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-500 dark:text-slate-400">
            This project helps you practice components, props, types, union
            types, forms, events, state, filtering, and localStorage in a clean
            dashboard layout.
          </p>

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
              Open Task Manager
            </Link>

            <a
              href="#about"
              className={[
                "rounded-xl border px-6 py-3 text-center font-semibold transition",
                "border-slate-300 dark:border-slate-700",
                "text-slate-700 dark:text-slate-200",
                "hover:bg-slate-100 dark:hover:bg-slate-900",
              ].join(" ")}
            >
              What You Learn
            </a>
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
                  Today
                </p>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Dashboard Preview
                </h2>
              </div>
              <span
                className={[
                  "rounded-full px-3 py-1 text-sm",
                  "bg-cyan-50 dark:bg-cyan-400/10",
                  "text-cyan-600 dark:text-cyan-300",
                ].join(" ")}
              >
                Live
              </span>
            </div>

            {/* Preview Tasks */}
            <div className="mt-5 space-y-4">
              {["Design UI", "Add TypeScript types", "Save tasks"].map(
                (item, index) => (
                  <div
                    key={item}
                    className={[
                      "rounded-xl border p-4 transition-colors",
                      "border-slate-200 dark:border-slate-800",
                      "bg-white dark:bg-slate-900",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-slate-900 dark:text-white">
                        {item}
                      </h3>
                      <span className="text-sm text-slate-400 dark:text-slate-500">
                        #{index + 1}
                      </span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className="h-2 rounded-full bg-cyan-500 dark:bg-cyan-400"
                        style={{ width: `${(index + 1) * 28}%` }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="mx-auto mt-20 max-w-7xl">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "TypeScript props and types",
            "React state and events",
            "Responsive Tailwind layout",
          ].map((item) => (
            <div
              key={item}
              className={[
                "rounded-2xl border p-6 transition-colors duration-300",
                "border-slate-200 dark:border-slate-800",
                "bg-white dark:bg-slate-900/60",
              ].join(" ")}
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {item}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Practice this concept inside a real mini dashboard instead of
                only reading theory.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
