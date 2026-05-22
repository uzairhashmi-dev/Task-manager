export type TaskPriority = "low" | "medium" | "high";

export type TaskStatus = "pending" | "in-progress" | "done";

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
};

export type TaskFilter = "all" | TaskStatus;