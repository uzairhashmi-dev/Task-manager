"use client";

import { useState } from "react";
import Link from "next/link";
import { getTasksByCategory } from "@/lib/taskStorage";
import type { Task, TaskCategory, TaskStatus } from "@/types/task";

// ── STYLE LOOKUP TABLES 
const priorityStyles: Record<string, string> = {
  low: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:border-emerald-400/20",
  medium: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-400/10 dark:text-amber-300 dark:border-amber-400/20",
  high: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-400/10 dark:text-rose-300 dark:border-rose-400/20",
};

const statusStyles: Record<string, string> = {
  pending: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-200",
  "in-progress": "bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300",
  done: "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300",
};

type CategoryTaskListProps = {
  category: TaskCategory;
  // page.tsx se aata hai
};

export default function CategoryTaskList({ category }: CategoryTaskListProps) {

  const [tasks] = useState<Task[]>(() => getTasksByCategory(category));

  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");

  // Filter apply karo
  const filtered = tasks.filter((task) =>
    statusFilter === "all" ? true : task.status === statusFilter
  );

  // ── STATS 
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "done").length;
  const pending = tasks.filter((t) => t.status === "pending").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;

  // ── EMPTY STAtS
  if (total === 0) {
    return (
      <div
        className={[
          "rounded-2xl border border-dashed p-16 text-center",
          "border-slate-300 dark:border-slate-700",
        ].join(" ")}
      >
        <p className="text-4xl mb-3">📂</p>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          No {category} tasks yet
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Create a task with the {category} category to see it here.
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
          + Create Task
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {/* ── MINI STATS */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            label: "Total",
            value: total,
            color: "text-slate-900 dark:text-white",
            bg: "bg-white dark:bg-slate-900/70",
          },
          {
            label: "Done",
            value: done,
            color: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-50 dark:bg-emerald-400/10",
          },
          {
            label: "In Progress",
            value: inProgress,
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-50 dark:bg-blue-400/10",
          },
          {
            label: "Pending",
            value: pending,
            color: "text-amber-600 dark:text-amber-400",
            bg: "bg-amber-50 dark:bg-amber-400/10",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={[
              "rounded-xl border p-4 transition-colors duration-300",
              "border-slate-200 dark:border-slate-800",
              stat.bg,
            ].join(" ")}
          >
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
            <p className={`text-2xl font-bold mt-1 ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── STATUS FILTER */}
      <div
        className={[
          "rounded-2xl border p-4 transition-colors duration-300",
          "bg-white dark:bg-slate-900/70",
          "border-slate-200 dark:border-slate-800",
        ].join(" ")}
      >
        <div className="flex flex-col gap-3
                        sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            Showing{" "}
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
              {filtered.length}
            </span>{" "}
            of {total} tasks
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {(["all", "pending", "in-progress", "done"] as const).map(
              (s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatusFilter(s)}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-medium transition capitalize",
                    statusFilter === s
                      ? "bg-cyan-500 dark:bg-cyan-400 text-white dark:text-slate-950"
                      : [
                          "bg-slate-100 dark:bg-slate-800",
                          "text-slate-600 dark:text-slate-300",
                          "hover:bg-slate-200 dark:hover:bg-slate-700",
                        ].join(" "),
                  ].join(" ")}
                >
                  {s.replace("-", " ")}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* ── TASK CARDS */}
      {filtered.length === 0 ? (
        <div
          className={[
            "rounded-2xl border border-dashed p-10 text-center",
            "border-slate-300 dark:border-slate-700",
          ].join(" ")}
        >
          <p className="text-slate-500 dark:text-slate-400">
            No {statusFilter === "all" ? "" : statusFilter} tasks found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((task) => (
            <div
              key={task.id}
              className={[
                "rounded-2xl border p-5 transition-colors duration-300",
                "bg-white dark:bg-slate-900/70",
                "border-slate-200 dark:border-slate-800",
              ].join(" ")}
            >
              {/* TOP ROW */}
              <div className="flex flex-col gap-3
                              sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold
                                  text-slate-900 dark:text-white">
                    {task.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {task.description || "No description added."}
                  </p>
                </div>

                {/* Priority Badge */}
                <span
                  className={[
                    "w-fit rounded-full border px-3 py-1",
                    "text-xs font-semibold capitalize flex-shrink-0",
                    priorityStyles[task.priority],
                  ].join(" ")}
                >
                  {task.priority}
                </span>
              </div>

              {/* BOTTOM ROW */}
              <div className="mt-4 flex flex-col gap-3
                              sm:flex-row sm:items-center sm:justify-between">
                <span
                  className={[
                    "w-fit rounded-full px-3 py-1",
                    "text-xs font-medium capitalize",
                    statusStyles[task.status],
                  ].join(" ")}
                >
                  {task.status.replace("-", " ")}
                </span>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/tasks/${task.id}`}
                    // ↑ Dynamic URL — task detail page
                    className={[
                      "rounded-lg border px-4 py-2 text-sm font-medium transition",
                      "bg-slate-50 dark:bg-slate-800",
                      "text-slate-600 dark:text-slate-300",
                      "border-slate-200 dark:border-slate-700",
                      "hover:bg-slate-100 dark:hover:bg-slate-700",
                    ].join(" ")}
                  >
                    View
                  </Link>
                  <Link
                    href={`/tasks/${task.id}/edit`}
                    // ↑ Nested dynamic URL — edit page
                    className={[
                      "rounded-lg px-4 py-2 text-sm font-medium transition",
                      "bg-cyan-50 dark:bg-cyan-400/10",
                      "text-cyan-600 dark:text-cyan-300",
                      "hover:bg-cyan-100 dark:hover:bg-cyan-400/20",
                    ].join(" ")}
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}