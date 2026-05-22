import type { Task, TaskStatus } from "@/types/task";

type TaskCardProps = {
  task: Task;
  onDeleteTask: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
};

const priorityStyles = {
  low: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
  medium: "bg-amber-400/10 text-amber-300 border-amber-400/20",
  high: "bg-rose-400/10 text-rose-300 border-rose-400/20",
};

const statusStyles = {
  pending: "bg-slate-700 text-slate-200",
  "in-progress": "bg-blue-400/10 text-blue-300",
  done: "bg-emerald-400/10 text-emerald-300",
};

export default function TaskCard({
  task,
  onDeleteTask,
  onStatusChange,
}: TaskCardProps) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{task.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {task.description || "No description added."}
          </p>
        </div>

        <span
          className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold capitalize ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span
          className={`w-fit rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[task.status]}`}
        >
          {task.status.replace("-", " ")}
        </span>

        <div className="flex flex-wrap gap-2">
          <select
            value={task.status}
            onChange={(event) =>
              onStatusChange(task.id, event.target.value as TaskStatus)
            }
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <button
            type="button"
            onClick={() => onDeleteTask(task.id)}
            className="rounded-lg bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-300 transition hover:bg-rose-500/20"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}