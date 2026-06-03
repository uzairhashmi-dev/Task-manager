"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import TaskFilter from "@/components/TaskFilter";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import StatsCards from "@/components/StatsCards";
import CategoryFilter from "@/components/CategoryFilter";
import ToastContainer from "@/components/Toast";
import { useToast } from "@/hooks/useToast";
import { getTasksFromStorage, saveTasksToStorage } from "@/lib/taskStorage";
import type {
  Task,
  TaskFilter as TaskFilterType,
  TaskStatus,
  TaskCategoryFilter,
} from "@/types/task";

export default function TaskDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState<TaskFilterType>("all");
  const [activeCategory, setActiveCategory] =
    useState<TaskCategoryFilter>("all");
  const [hasLoaded, setHasLoaded] = useState(false);

  const { toasts, showToast, dismissToast } = useToast();

  const [deletedTask, setDeletedTask] = useState<Task | null>(null);
  const deleteToastId = useRef<string | null>(null);
  const permanentDeleteTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // ── LOAD 
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTasks(getTasksFromStorage());
      setHasLoaded(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      saveTasksToStorage(tasks);
    }
  }, [tasks, hasLoaded]);

  // ── CLEANUP
  useEffect(() => {
    return () => {
      if (permanentDeleteTimer.current) {
        clearTimeout(permanentDeleteTimer.current);
      }
    };
  }, []);

  // ── ADD ───
  function handleAddTask(task: Task) {
    setTasks((prev) => [task, ...prev]);
  }

  // ── COMMIT DELETE — permanently hatao ──
  function commitDelete() {
    setDeletedTask(null);
    deleteToastId.current = null;
    if (permanentDeleteTimer.current) {
      clearTimeout(permanentDeleteTimer.current);
      permanentDeleteTimer.current = null;
    }
  }

  // ── SOFT DELETE 
  function handleDeleteTask(id: string) {
    // Pehle se pending delete hai? Commit karo
    if (deletedTask) {
      commitDelete();
    }

    const taskToDelete = tasks.find((t) => t.id === id);
    if (!taskToDelete) return;

    // UI se hatao
    setTasks((prev) => prev.filter((t) => t.id !== id));

    // Soft delete state
    setDeletedTask(taskToDelete);

    // Toast dikhao
    const toastId = showToast(
      `"${taskToDelete.title}" deleted`,
      "delete",
      5000
    );
    deleteToastId.current = toastId;

    // 5 sec baad permanently delete
    permanentDeleteTimer.current = setTimeout(() => {
      commitDelete();
    }, 5000);
  }

  // ── UNDO DELETE 
  function handleUndo(toastId: string) {
    if (!deletedTask) return;

    if (permanentDeleteTimer.current) {
      clearTimeout(permanentDeleteTimer.current);
      permanentDeleteTimer.current = null;
    }

    // Task wapas add karo
    setTasks((prev) => [deletedTask, ...prev]);

    dismissToast(toastId);
    deleteToastId.current = null;

    showToast(`"${deletedTask.title}" restored`, "restore", 3000);

    setDeletedTask(null);
  }

  // ── STATUS CHANGE 
  function handleStatusChange(id: string, status: TaskStatus) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  }

  // ── FILTERED TASKS
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatch =
        activeFilter === "all" || task.status === activeFilter;
      const categoryMatch =
        activeCategory === "all" || task.category === activeCategory;
      return statusMatch && categoryMatch;
    });
  }, [tasks, activeFilter, activeCategory]);

  return (
    <main
      className={[
        "min-h-screen px-4 py-8 sm:px-6 lg:px-8",
        "transition-colors duration-300",
        "bg-slate-50 dark:bg-slate-950",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <section className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em]
                         text-cyan-600 dark:text-cyan-300">
            Next.js + TypeScript Practice
          </p>
          <div className="mt-4 max-w-3xl">
            <h1
              className="text-4xl font-bold tracking-tight
                          text-slate-900 dark:text-white sm:text-5xl"
            >
              Task Manager Dashboard
            </h1>
            <p
              className="mt-4 text-base leading-7
                          text-slate-500 dark:text-slate-400 sm:text-lg"
            >
              Create, filter, update, and delete tasks.
            </p>
          </div>
        </section>

        <StatsCards tasks={tasks} />

        <section className="mt-8 grid gap-6 lg:grid-cols-[380px_1fr]">
          <TaskForm onAddTask={handleAddTask} />

          <div
            className={[
              "rounded-2xl border p-5 transition-colors duration-300",
              "bg-white/50 dark:bg-slate-900/40",
              "border-slate-200 dark:border-slate-800",
            ].join(" ")}
          >
            {/* Category Filter */}
            <div className="mb-4">
              <p
                className="mb-2 text-xs font-medium uppercase tracking-wider
                             text-slate-400 dark:text-slate-500"
              >
                Category
              </p>
              <CategoryFilter
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>

            {/* Status Filter + Count */}
            <div
              className="mb-5 flex flex-col gap-4
                          xl:flex-row xl:items-center xl:justify-between"
            >
              <div>
                <h2
                  className="text-xl font-semibold
                               text-slate-900 dark:text-white"
                >
                  Task List
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Showing {filteredTasks.length} of {tasks.length} tasks.
                </p>
              </div>
              <TaskFilter
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
            </div>

            <div className="max-h-[350px] overflow-y-auto">
              <TaskList
                tasks={filteredTasks}
                onDeleteTask={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Toast Container */}
      <ToastContainer
        toasts={toasts}
        onDismiss={dismissToast}
        onUndo={handleUndo}
      />
    </main>
  );
}