import type { Task, TaskStatus } from "@/types/task";

type TaskCardProps = {
  task: Task;
  onDeleteTask: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
};

// Priority badge colors
const priorityStyles = {
  low: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:border-emerald-400/20",
  medium: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-400/10 dark:text-amber-300 dark:border-amber-400/20",
  high: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-400/10 dark:text-rose-300 dark:border-rose-400/20",
};

// Status badge colors
const statusStyles = {
  pending: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-200",
  "in-progress": "bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300",
  done: "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300",
};

// Category badge colors — NEW
const categoryStyles = {
  work: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-400/10 dark:text-blue-300 dark:border-blue-400/20",
  personal: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-400/10 dark:text-purple-300 dark:border-purple-400/20",
  study: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-400/10 dark:text-amber-300 dark:border-amber-400/20",
  other: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:border-slate-600",
};

export default function TaskCard({ task, onDeleteTask, onStatusChange }: TaskCardProps) {
  const selectClasses = [
    "rounded-lg px-3 py-2 text-sm outline-none transition",
    "border",
    "bg-white dark:bg-slate-950",
    "text-slate-900 dark:text-white",
    "border-slate-300 dark:border-slate-700",
    "focus:border-cyan-500 dark:focus:border-cyan-400",
  ].join(" ");

  return (
    <article
      className={[
        "rounded-2xl border p-5 shadow-lg transition-colors duration-300",
        "bg-white dark:bg-slate-900/70",
        "border-slate-200 dark:border-slate-800",
        "shadow-slate-200/30 dark:shadow-slate-950/20",
      ].join(" ")}
    >
      {/* TOP ROW — title + priority + category */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {task.title}
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {task.description || "No description added."}
          </p>
        </div>

        {/* Badges — Priority + Category */}
        <div className="flex flex-wrap gap-2">
          {/* Category Badge — NEW */}
          <span
            className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold capitalize ${categoryStyles[task.category]}`}
          >
            {task.category}
          </span>

          {/* Priority Badge */}
          <span
            className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold capitalize ${priorityStyles[task.priority]}`}
          >
            {task.priority}
          </span>
        </div>
      </div>

      {/* BOTTOM ROW — status + actions */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span
          className={`w-fit rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[task.status]}`}
        >
          {task.status.replace("-", " ")}
        </span>

        <div className="flex flex-wrap gap-2">
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
            className={selectClasses}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <button
            type="button"
            onClick={() => onDeleteTask(task.id)}
            className="rounded-lg px-4 py-2 text-sm font-medium transition bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:bg-rose-500/20"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}