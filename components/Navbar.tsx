import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-bold tracking-tight text-white">
          TaskFlow
        </Link>

        <div className="flex flex-wrap gap-3 text-sm font-medium text-slate-300">
          <Link
            href="/"
            className="rounded-full px-4 py-2 transition hover:bg-slate-800 hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/tasks"
            className="rounded-full px-4 py-2 transition hover:bg-slate-800 hover:text-white"
          >
            Tasks
          </Link>

          <Link
            href="/#about"
            className="rounded-full px-4 py-2 transition hover:bg-slate-800 hover:text-white"
          >
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}