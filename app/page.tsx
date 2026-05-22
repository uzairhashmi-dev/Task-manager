import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            TypeScript Practice Project
          </p>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
            Build your task workflow with Next.js.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            This project helps you practice components, props, types, union
            types, forms, events, state, filtering, and localStorage in a clean
            dashboard layout.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tasks"
              className="rounded-xl bg-cyan-400 px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Open Task Manager
            </Link>

            <a
              href="#about"
              className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 transition hover:bg-slate-900"
            >
              What You Learn
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20">
          <div className="rounded-2xl bg-slate-950 p-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <p className="text-sm text-slate-400">Today</p>
                <h2 className="text-xl font-semibold">Dashboard Preview</h2>
              </div>

              <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
                Live
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {["Design UI", "Add TypeScript types", "Save tasks"].map(
                (item, index) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-800 bg-slate-900 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{item}</h3>
                      <span className="text-sm text-slate-500">
                        #{index + 1}
                      </span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-slate-800">
                      <div
                        className="h-2 rounded-full bg-cyan-400"
                        style={{ width: `${(index + 1) * 28}%` }}
                      />
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto mt-20 max-w-7xl">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "TypeScript props and types",
            "React state and events",
            "Responsive Tailwind layout",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
            >
              <h3 className="text-lg font-semibold">{item}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
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