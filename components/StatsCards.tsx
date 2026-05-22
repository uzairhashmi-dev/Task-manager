import type { Task } from "@/types/task";

type StatsCardsProps = {
  tasks: Task[];
};

export default function StatsCards({ tasks }: StatsCardsProps) {
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === "pending").length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress",
  ).length;
  const doneTasks = tasks.filter((task) => task.status === "done").length;

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      description: "All created tasks",
    },
    {
      title: "Pending",
      value: pendingTasks,
      description: "Not started yet",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      description: "Currently working",
    },
    {
      title: "Done",
      value: doneTasks,
      description: "Completed tasks",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/30"
        >
          <p className="text-sm text-slate-400">{stat.title}</p>
          <h3 className="mt-2 text-3xl font-bold text-white">{stat.value}</h3>
          <p className="mt-1 text-sm text-slate-500">{stat.description}</p>
        </div>
      ))}
    </section>
  );
}