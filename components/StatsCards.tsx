import type { Task } from "@/types/task";

type StatsCardsProps = { tasks: Task[] };

export default function StatsCards({ tasks }: StatsCardsProps) {
  const stats = [
    {
      title: "Total Tasks",
      value: tasks.length,
      description: "All created tasks",
    },
    {
      title: "Pending",
      value: tasks.filter((t) => t.status === "pending").length,
      description: "Not started yet",
    },
    {
      title: "In Progress",
      value: tasks.filter((t) => t.status === "in-progress").length,
      description: "Currently working",
    },
    {
      title: "Done",
      value: tasks.filter((t) => t.status === "done").length,
      description: "Completed tasks",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={[
            "rounded-2xl border p-5 shadow-lg transition-colors duration-300",
            "bg-white dark:bg-slate-900/70",
            "border-slate-200 dark:border-slate-800",
            "shadow-slate-200/30 dark:shadow-slate-950/30",
          ].join(" ")}
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {stat.title}
          </p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {stat.value}
          </h3>
          <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
            {stat.description}
          </p>
        </div>
      ))}
    </section>
  );
}
