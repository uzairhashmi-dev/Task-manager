"use client";

import { useState } from "react";
import { getTasksFromStorage } from "@/lib/taskStorage";
import type { Task } from "@/types/task";

function ProgressBar({
  value,
  max,
  color,
}: {
  value: number;
  max: number;
  color: string;
}) {
  const percent = max === 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 rounded-full bg-slate-100 dark:bg-slate-800 h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs font-medium w-8 text-right text-slate-500 dark:text-slate-400">
        {percent}%
      </span>
    </div>
  );
}

function StatCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={[
        "rounded-2xl border p-5 transition-colors duration-300",
        "bg-white dark:bg-slate-900/70",
        "border-slate-200 dark:border-slate-800",
      ].join(" ")}
    >
      <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function StatsContent() {
  // ✅ LAZY INITIALIZER — no useEffect, no error
  const [tasks] = useState<Task[]>(getTasksFromStorage);

  const total = tasks.length;

  // baaki sab code same rahega...

  // ── STATUS COUNTS ─────────────────────────────
  const pending = tasks.filter((t) => t.status === "pending").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const done = tasks.filter((t) => t.status === "done").length;
  const completionRate = total === 0 ? 0 : Math.round((done / total) * 100);

  // ── PRIORITY COUNTS ───────────────────────────
  const high = tasks.filter((t) => t.priority === "high").length;
  const medium = tasks.filter((t) => t.priority === "medium").length;
  const low = tasks.filter((t) => t.priority === "low").length;

  // ── CATEGORY COUNTS ───────────────────────────
  const work = tasks.filter((t) => t.category === "work").length;
  const personal = tasks.filter((t) => t.category === "personal").length;
  const study = tasks.filter((t) => t.category === "study").length;
  const other = tasks.filter((t) => t.category === "other").length;

  // ── MOST USED CATEGORY ────────────────────────
  const categoryCounts = { work, personal, study, other };
  const topCategory = Object.entries(categoryCounts).sort(
    (a, b) => b[1] - a[1]
  )[0];

  // ── NO TASKS STATE ────────────────────────────
  if (total === 0) {
    return (
      <div
        className={[
          "rounded-2xl border border-dashed p-16 text-center",
          "border-slate-300 dark:border-slate-700",
        ].join(" ")}
      >
        <p className="text-4xl mb-3">📋</p>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          No tasks yet
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Create some tasks first to see your stats.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ── TOP SUMMARY CARDS ─────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Tasks",
            value: total,
            sub: "all tasks",
            color: "text-slate-900 dark:text-white",
            bg: "bg-slate-50 dark:bg-slate-800/50",
          },
          {
            label: "Completed",
            value: done,
            sub: `${completionRate}% done`,
            color: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-50 dark:bg-emerald-400/10",
          },
          {
            label: "In Progress",
            value: inProgress,
            sub: "currently active",
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-50 dark:bg-blue-400/10",
          },
          {
            label: "Pending",
            value: pending,
            sub: "not started",
            color: "text-amber-600 dark:text-amber-400",
            bg: "bg-amber-50 dark:bg-amber-400/10",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={[
              "rounded-2xl border p-5 transition-colors duration-300",
              "border-slate-200 dark:border-slate-800",
              stat.bg,
            ].join(" ")}
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
            <p className={`mt-2 text-4xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      {/* ── COMPLETION RATE BIG BAR ───────────── */}
      <div
        className={[
          "rounded-2xl border p-6 transition-colors duration-300",
          "bg-white dark:bg-slate-900/70",
          "border-slate-200 dark:border-slate-800",
        ].join(" ")}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Overall Completion
          </h2>
          <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
            {completionRate}%
          </span>
        </div>
        <div className="h-4 rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-4 rounded-full bg-cyan-500 dark:bg-cyan-400 transition-all duration-700"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <div className="mt-3 flex gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span>✅ Done: {done}</span>
          <span>⏳ In Progress: {inProgress}</span>
          <span>🕐 Pending: {pending}</span>
        </div>
      </div>

      {/* ── 3 DETAIL CARDS ───────────────────── */}
      <div className="grid gap-4 md:grid-cols-3">

        {/* STATUS BREAKDOWN */}
        <StatCard title="By Status">
          <div className="space-y-4">
            {[
              { label: "Done", value: done, color: "bg-emerald-500" },
              { label: "In Progress", value: inProgress, color: "bg-blue-500" },
              { label: "Pending", value: pending, color: "bg-amber-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-300">
                    {item.label}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {item.value}
                  </span>
                </div>
                <ProgressBar
                  value={item.value}
                  max={total}
                  color={item.color}
                />
              </div>
            ))}
          </div>
        </StatCard>

        {/* PRIORITY BREAKDOWN */}
        <StatCard title="By Priority">
          <div className="space-y-4">
            {[
              { label: "High", value: high, color: "bg-rose-500" },
              { label: "Medium", value: medium, color: "bg-amber-500" },
              { label: "Low", value: low, color: "bg-emerald-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-300">
                    {item.label}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {item.value}
                  </span>
                </div>
                <ProgressBar
                  value={item.value}
                  max={total}
                  color={item.color}
                />
              </div>
            ))}
          </div>
        </StatCard>

        {/* CATEGORY BREAKDOWN */}
        <StatCard title="By Category">
          <div className="space-y-4">
            {[
              { label: "Work", value: work, color: "bg-blue-500" },
              { label: "Personal", value: personal, color: "bg-purple-500" },
              { label: "Study", value: study, color: "bg-amber-500" },
              { label: "Other", value: other, color: "bg-slate-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-300">
                    {item.label}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {item.value}
                  </span>
                </div>
                <ProgressBar
                  value={item.value}
                  max={total}
                  color={item.color}
                />
              </div>
            ))}
          </div>
        </StatCard>
      </div>

      {/* ── INSIGHT CARD ──────────────────────── */}
      <div
        className={[
          "rounded-2xl border p-5 transition-colors duration-300",
          "bg-cyan-50 dark:bg-cyan-400/10",
          "border-cyan-200 dark:border-cyan-400/20",
        ].join(" ")}
      >
        <h2 className="text-base font-semibold text-cyan-700 dark:text-cyan-300 mb-3">
          Quick Insights
        </h2>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 text-sm">
          <p className="text-slate-600 dark:text-slate-300">
            🏆 Top category:{" "}
            <span className="font-semibold capitalize text-slate-900 dark:text-white">
              {topCategory?.[0] ?? "—"}
            </span>
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            🔥 High priority tasks:{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {high}
            </span>
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            📈 Completion rate:{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {completionRate}%
            </span>
          </p>
        </div>
      </div>

    </div>
  );
}