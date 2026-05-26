import type { Task, TaskCategory } from "@/types/task";

const STORAGE_KEY = "next-task-manager-tasks";

export function getTasksFromStorage(): Task[] {
  if (typeof window === "undefined") return [];

  const savedTasks = localStorage.getItem(STORAGE_KEY);
  if (!savedTasks) return [];

  try {
    const parsed = JSON.parse(savedTasks) as Array<Task & { category?: TaskCategory }>;

    // YE BACKWARDS COMPATIBILITY HA
    return parsed.map((task) => ({
      ...task,
      category: task.category ?? "other",
    }));
  } catch {
    return [];
  }
}

export function saveTasksToStorage(tasks: Task[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}