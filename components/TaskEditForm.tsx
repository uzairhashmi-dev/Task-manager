"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getTaskById, updateTaskInStorage } from "@/lib/taskStorage";
import type { Task, TaskPriority, TaskStatus, TaskCategory } from "@/types/task";

type TaskEditFormProps = {
  id: string;
};

export default function TaskEditForm({ id }: TaskEditFormProps) {
  const router = useRouter();

  const [task] = useState<Task | null>(() => getTaskById(id));

  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [priority, setPriority] = useState<TaskPriority>(task?.priority ?? "medium");
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? "pending");
  const [category, setCategory] = useState<TaskCategory>(task?.category ?? "work");
  const [saved, setSaved] = useState(false);

  // ── TASK NOT FOUND
  if (!task) {
    return (
      <div
        className={[
          "rounded-2xl border border-dashed p-16 text-center",
          "border-slate-300 dark:border-slate-700",
        ].join(" ")}
      >
        <p className="text-4xl mb-3">🔍</p>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Task not found
        </h2>
        <Link
          href="/tasks"
          className={[
            "mt-6 inline-block rounded-xl px-6 py-3 font-semibold transition text-sm",
            "bg-cyan-500 dark:bg-cyan-400",
            "text-white dark:text-slate-950",
            "hover:bg-cyan-400 dark:hover:bg-cyan-300",
          ].join(" ")}
        >
          ← Back to Tasks
        </Link>
      </div>
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (!title.trim()) return;

  // TypeScript ko guarantee mil gayi
  if (!task) return;

  const updatedTask: Task = {
    id: task.id,
    createdAt: task.createdAt,
    title: title.trim(),
    description: description.trim(),
    priority,
    status,
    category,
  };

  updateTaskInStorage(updatedTask);
  setSaved(true);

  setTimeout(() => {
    router.push(`/tasks/${id}`);
  }, 800);
}

  const inputClasses = [
    "w-full rounded-xl px-4 py-3 text-sm outline-none transition",
    "border",
    "bg-white dark:bg-slate-950",
    "text-slate-900 dark:text-white",
    "border-slate-300 dark:border-slate-700",
    "focus:border-cyan-500 dark:focus:border-cyan-400",
  ].join(" ");

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <Link
          href={`/tasks/${id}`}
          className="text-sm text-slate-500 dark:text-slate-400
                     hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          ← Back to Task
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
          Edit Task
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Update your task details below.
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className={[
          "rounded-2xl border p-6 space-y-5 transition-colors duration-300",
          "bg-white dark:bg-slate-900/70",
          "border-slate-200 dark:border-slate-800",
        ].join(" ")}
      >
        {/* SUCCESS MESSAGE */}
        {saved && (
          <div
            className={[
              "rounded-xl border px-4 py-3 text-sm font-medium",
              "bg-emerald-50 dark:bg-emerald-400/10",
              "text-emerald-700 dark:text-emerald-300",
              "border-emerald-200 dark:border-emerald-400/20",
            ].join(" ")}
          >
            ✅ Task saved! Redirecting...
          </div>
        )}

        {/* TITLE */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Task Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClasses}
            placeholder="Task title..."
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={`${inputClasses} resize-none`}
            placeholder="Task description..."
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as TaskCategory)}
            className={inputClasses}
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="study">Study</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* PRIORITY + STATUS */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className={inputClasses}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className={inputClasses}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-3 sm:flex-row pt-2">
          <button
            type="submit"
            disabled={saved}
            className={[
              "flex-1 rounded-xl px-5 py-3 font-semibold transition text-sm",
              "bg-cyan-500 dark:bg-cyan-400",
              "text-white dark:text-slate-950",
              "hover:bg-cyan-400 dark:hover:bg-cyan-300",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            ].join(" ")}
          >
            {saved ? "Saving..." : "Save Changes"}
          </button>

          <Link
            href={`/tasks/${id}`}
            className={[
              "flex-1 rounded-xl border px-5 py-3 font-semibold",
              "transition text-sm text-center",
              "border-slate-300 dark:border-slate-700",
              "text-slate-700 dark:text-slate-200",
              "hover:bg-slate-100 dark:hover:bg-slate-900",
            ].join(" ")}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}