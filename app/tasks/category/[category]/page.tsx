
import { notFound } from "next/navigation";
import type { TaskCategory } from "@/types/task";
import CategoryTaskList from "@/components/CategoryTaskList";
import Link from "next/link";

// Ye array kaafi important hai — do kaam karta hai
const VALID_CATEGORIES: TaskCategory[] = [
  "work",
  "personal",
  "study",
  "other",
];

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({
    category,
  }));
}

// ── PAGE METADATA — DYNAMIC
// Next.js feature — har page ka alag title react mage manualy
type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Tasks — TaskFlow`,
  };
}

// ── PAGE COMPONENT 
export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  // category = URL se aaya — "work" | "personal" etc.

  // VALIDATION — galat URL check karo
  const isValid = VALID_CATEGORIES.includes(category as TaskCategory);
  if (!isValid) {
    notFound();
    // /tasks/category/gaming → invalid → 404 page
    // notFound() Next.js ka built-in — app/not-found.tsx dikhata hai
  }

  const validCategory = category as TaskCategory;

  // Category ke display naam aur colors
  const categoryMeta: Record <
    TaskCategory,
    { label: string; color: string; bg: string; border: string }
  > = {
    work: {
      label: "Work",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-400/10",
      border: "border-blue-200 dark:border-blue-400/20",
    },
    personal: {
      label: "Personal",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-400/10",
      border: "border-purple-200 dark:border-purple-400/20",
    },
    study: {
      label: "Study",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-400/10",
      border: "border-amber-200 dark:border-amber-400/20",
    },
    other: {
      label: "Other",
      color: "text-slate-600 dark:text-slate-400",
      bg: "bg-slate-100 dark:bg-slate-700/50",
      border: "border-slate-200 dark:border-slate-600",
    },
  };

  const meta = categoryMeta[validCategory];

  return (
    <main
      className={[
        "min-h-screen px-4 py-8 sm:px-6 lg:px-8",
        "transition-colors duration-300",
        "bg-slate-50 dark:bg-slate-950",
      ].join(" ")}
    >
      <div className="mx-auto max-w-4xl space-y-8">

        {/* ── HEADER  */}
        <div className="flex flex-col gap-4
                        sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/tasks"
              className="text-sm text-slate-500 dark:text-slate-400
                         hover:text-slate-900 dark:hover:text-white
                         transition-colors"
            >
              ← Back to Tasks
            </Link>

            <div className="mt-2 flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white
                             sm:text-4xl">
                {meta.label} Tasks
              </h1>
              {/* Category Badge */}
              <span
                className={[
                  "rounded-full border px-3 py-1 text-xs font-semibold capitalize",
                  meta.color,
                  meta.bg,
                  meta.border,
                ].join(" ")}
              >
                {meta.label}
              </span>
            </div>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              All tasks in the {meta.label.toLowerCase()} category.
            </p>
          </div>

          {/* Add Task shortcut */}
          <Link
            href="/tasks"
            className={[
              "w-fit rounded-xl px-5 py-2.5 font-semibold transition text-sm",
              "bg-cyan-500 dark:bg-cyan-400",
              "text-white dark:text-slate-950",
              "hover:bg-cyan-400 dark:hover:bg-cyan-300",
            ].join(" ")}
          >
            + Add Task
          </Link>
        </div>

        {/* ── OTHER CATEGORIES NAV  */}
        <div
          className={[
            "rounded-2xl border p-4 transition-colors duration-300",
            "bg-white dark:bg-slate-900/70",
            "border-slate-200 dark:border-slate-800",
          ].join(" ")}
        >
          <p className="text-xs font-semibold uppercase tracking-wider
                         text-slate-400 dark:text-slate-500 mb-3">
            Other Categories
          </p>
          <div className="flex flex-wrap gap-2">
            {VALID_CATEGORIES.filter((c) => c !== validCategory).map((cat) => (
              <Link
                key={cat}
                href={`/tasks/category/${cat}`}
                // ↑ Dynamic URL — navigate to other category
                className={[
                  "rounded-full border px-4 py-2 text-sm font-medium",
                  "capitalize transition-colors",
                  "border-slate-200 dark:border-slate-700",
                  "text-slate-600 dark:text-slate-300",
                  "hover:border-cyan-300 dark:hover:border-cyan-400/50",
                  "hover:text-cyan-600 dark:hover:text-cyan-400",
                  "bg-white dark:bg-slate-900",
                ].join(" ")}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* ── TASK LIST — CLIENT COMPONENT ─────── */}
        <CategoryTaskList category={validCategory} />
        {/*
          Server component client component render kar sakta hai
          localStorage access client component karega
          Server component localStorage nahi de sakta
        */}

      </div>
    </main>
  );
}