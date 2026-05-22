import type { Task, TaskStatus } from "@/types/task";
import TaskCard from "@/components/TaskCard";

type TaskListProps = {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
};

export default function TaskList({
  tasks,
  onDeleteTask,
  onStatusChange,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center">
        <h3 className="text-lg font-semibold text-white">No tasks found</h3>
        <p className="mt-2 text-sm text-slate-400">
          Create a new task or change your selected filter.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}