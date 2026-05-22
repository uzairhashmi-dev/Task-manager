import type { Task } from "@/types/task";

const STORAGE_KEY = "next-task-manager-tasks";

export function getTasksFromStorage(): Task[] {
  if (typeof window === "undefined") {
    return [];
  }

  const savedTasks = localStorage.getItem(STORAGE_KEY);

  if (!savedTasks) {
    return [];
  }

  try {
    return JSON.parse(savedTasks) as Task[];
  } catch {
    return [];
  }
}

export function saveTasksToStorage(tasks: Task[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}