"use client";

import { useState } from "react";
import Link from "next/link";
import { getTaskById } from "@/lib/taskStorage";

const priorityStyles = {
  low: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:border-emerald-400/20",
  medium: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-400/10 dark:text-amber-300 dark:border-amber-400/20",
  high: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-400/10 dark:text-rose-300 dark:border-rose-400/20",
};

const statusStyles = {
  pending: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-200",
  "in-progress": "bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300",
  done: "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300",
};

const categoryStyles = {
  work: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-400/10 dark:text-blue-300 dark:border-blue-400/20",
  personal: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-400/10 dark:text-purple-300 dark:border-purple-400/20",
  study: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-400/10 dark:text-amber-300 dark:border-amber-400/20",
  other: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:border-slate-600",
};

type TaskDetailProps = {
  id: string;
  // page.tsx se aata hai — URL ka id
};

export default function TaskDetail({ id }: TaskDetailProps) {
  // Lazy initializer — ek baar chalta hai
  const [task] = useState(() => getTaskById(id));
  // getTaskById(id) → localStorage se id wala task dhundho
  // null aaya toh task = null

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
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          This task may have been deleted.
        </p>
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

  // ── TASK FOUND
  return (
    <div className="space-y-6">

      {/* HEADER — back button + title */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href="/tasks"
            className="text-sm text-slate-500 dark:text-slate-400
                       hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            ← Back to Tasks
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {task.title}
          </h1>
        </div>

        {/* Edit Button — nested route pe jaata hai */}
        <Link
          href={`/tasks/${task.id}/edit`}
          className={[
            "w-fit rounded-xl px-5 py-2.5 font-semibold transition text-sm",
            "bg-cyan-500 dark:bg-cyan-400",
            "text-white dark:text-slate-950",
            "hover:bg-cyan-400 dark:hover:bg-cyan-300",
          ].join(" ")}
        >
          Edit Task
        </Link>
        {/* href={`/tasks/${task.id}/edit`}
            template literal → dynamic URL
            task.id = "abc-123"
            URL = /tasks/abc-123/edit */}
      </div>

      {/* MAIN CARD */}
      <div
        className={[
          "rounded-2xl border p-6 transition-colors duration-300",
          "bg-white dark:bg-slate-900/70",
          "border-slate-200 dark:border-slate-800",
        ].join(" ")}
      >
        {/* BADGES ROW */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize
                        ${categoryStyles[task.category]}`}
          >
            {task.category}
          </span>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize
                        ${priorityStyles[task.priority]}`}
          >
            {task.priority} priority
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize
                        ${statusStyles[task.status]}`}
          >
            {task.status.replace("-", " ")}
          </span>
        </div>

        {/* DESCRIPTION */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider
                         text-slate-400 dark:text-slate-500 mb-2">
            Description
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-7">
            {task.description || "No description added."}
          </p>
        </div>

        {/* DIVIDER */}
        <hr className="my-6 border-slate-200 dark:border-slate-800" />

        {/* META INFO */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Priority", value: task.priority },
            { label: "Status", value: task.status.replace("-", " ") },
            { label: "Category", value: task.category },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs font-semibold uppercase tracking-wider
                             text-slate-400 dark:text-slate-500">
                {item.label}
              </p>
              <p className="mt-1 font-medium capitalize text-slate-900 dark:text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <hr className="my-6 border-slate-200 dark:border-slate-800" />

        {/* CREATED DATE */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider
                         text-slate-400 dark:text-slate-500">
            Created
          </p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {new Date(task.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {/* "2024-01-15T10:30:00.000Z" → "January 15, 2024" */}
          </p>
        </div>
      </div>

    </div>
  );
}