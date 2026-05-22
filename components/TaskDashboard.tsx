"use client";

import { useEffect, useMemo, useState } from "react";
import TaskFilter from "@/components/TaskFilter";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import StatsCards from "@/components/StatsCards";
import { getTasksFromStorage, saveTasksToStorage } from "@/lib/taskStorage";
import type {
  Task,
  TaskFilter as TaskFilterType,
  TaskStatus,
} from "@/types/task";

export default function TaskDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState<TaskFilterType>("all");
  const [hasLoaded, setHasLoaded] = useState(false);

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

  function handleAddTask(task: Task) {
    setTasks((currentTasks) => [task, ...currentTasks]);
  }

  function handleDeleteTask(id: string) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  function handleStatusChange(id: string, status: TaskStatus) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status,
            }
          : task,
      ),
    );
  }
  const filteredTasks = useMemo(() => {
    if (activeFilter === "all") {
      return tasks;
    }

    return tasks.filter((task) => task.status === activeFilter);
  }, [tasks, activeFilter]);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Next.js + TypeScript 
          </p>

          <div className="mt-4 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Task Manager Dashboard
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">
              Create, filter, update, and delete tasks. This project helps you
              practice TypeScript types, props, state, events, localStorage, and
              responsive UI.
            </p>
          </div>
        </section>

        <StatsCards tasks={tasks} />

        <section className="mt-8 grid gap-6 lg:grid-cols-[380px_1fr]">
          <TaskForm onAddTask={handleAddTask} />

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Task List</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Showing {filteredTasks.length} of {tasks.length} tasks.
                </p>
              </div>

              <TaskFilter
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
            </div>

            <TaskList
              tasks={filteredTasks}
              onDeleteTask={handleDeleteTask}
              onStatusChange={handleStatusChange}
            />
          </div>
        </section>
      </div>
    </main>
  );
}