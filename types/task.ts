export type TaskPriority = "low" | "medium" | "high";

export type TaskStatus = "pending" | "in-progress" | "done";

export type TaskCategory = "work" | "personal" | "study" | "other";

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  category: TaskCategory; 
  createdAt: string;
};

export type TaskFilter = "all" | TaskStatus;

export type TaskCategoryFilter = "all" | TaskCategory;