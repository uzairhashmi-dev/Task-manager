"use client";

import { useState } from "react";
import type { Task, TaskPriority, TaskStatus, TaskCategory } from "@/types/task";

type TaskFormProps = {
  onAddTask: (task: Task) => void;
};

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [status, setStatus] = useState<TaskStatus>("pending");
  const [category, setCategory] = useState<TaskCategory>("work"); // ← NEW

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      category, 
      createdAt: new Date().toISOString(),
    };

    onAddTask(newTask);
    setTitle("");
    setDescription("");
    setPriority("medium");
    setStatus("pending");
    setCategory("work"); // reset
  }

  // Shared input/select classes — dark + light
  const inputClasses = [
    "w-full rounded-xl px-4 py-3 text-sm outline-none transition",
    "border",
    "bg-white dark:bg-slate-950",
    "text-slate-900 dark:text-white",
    "border-slate-300 dark:border-slate-700",
    "placeholder:text-slate-400 dark:placeholder:text-slate-600",
    "focus:border-cyan-500 dark:focus:border-cyan-400",
  ].join(" ");

  return (
    <form
      onSubmit={handleSubmit}
      className={[
        "rounded-2xl border p-5 shadow-lg",
        "transition-colors duration-300",
        "bg-white dark:bg-slate-900/80",
        "border-slate-200 dark:border-slate-800",
        "shadow-slate-200/50 dark:shadow-slate-950/30",
      ].join(" ")}
    >
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Create New Task
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Add task details, category, priority, and status.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Task Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add Task Title of Work"
            className={inputClasses}
          />
        </div>  
        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write short task details..."
            rows={3}
            className={`${inputClasses} resize-none`}
          />
        </div>
        {/* Category — NEW */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as TaskCategory)}
            className={inputClasses}
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="study">Study</option>
            <option value="other">Other</option>
          </select>
        </div>
        {/* Priority + Status */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className={inputClasses}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className={inputClasses}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className={[
            "w-full rounded-xl px-5 py-3 font-semibold transition",
            "bg-cyan-500 dark:bg-cyan-400",
            "text-white dark:text-slate-950",
            "hover:bg-cyan-400 dark:hover:bg-cyan-300",
          ].join(" ")}
        >
          Add Task
        </button>
      </div>
    </form>
  );
}