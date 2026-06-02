import type { Task, TaskCategory } from "@/types/task";

const STORAGE_KEY = "next-task-manager-tasks";

// Alag type — Turbopack fix
type StoredTask = Task & { category?: TaskCategory };

export function getTasksFromStorage(): Task[] {
  if (typeof window === "undefined") return [];

  const savedTasks = localStorage.getItem(STORAGE_KEY);
  if (!savedTasks) return [];

  try {
    const parsed = JSON.parse(savedTasks) as StoredTask[];
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

export function getTaskById(id: string): Task | null {
  const tasks = getTasksFromStorage();
  return tasks.find((task) => task.id === id) ?? null;
}

export function updateTaskInStorage(updatedTask: Task): void {
  const tasks = getTasksFromStorage();
  const newTasks = tasks.map((task) =>
    task.id === updatedTask.id ? updatedTask : task
  );
  saveTasksToStorage(newTasks);
}

// Category se tasks filter karo
export function getTasksByCategory(category: TaskCategory): Task[] {
  const tasks = getTasksFromStorage();
  return tasks.filter((task) => task.category === category);
  // filter → sirf us category ke tasks return karo
}