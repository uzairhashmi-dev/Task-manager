
import TaskDetail from "@/components/TaskDetail";

type Props = {
  params: Promise<{ id: string }>;
  // { id: string } → [id] folder ka naam
};

export default async function TaskDetailPage({ params }: Props) {
  const { id } = await params;
  // async/await → params Promise hai isliye
  // id = URL se aata hai
  // /tasks/abc-123 → id = "abc-123"

  return (
    <main
      className={[
        "min-h-screen px-4 py-8 sm:px-6 lg:px-8",
        "transition-colors duration-300",
        "bg-slate-50 dark:bg-slate-950",
      ].join(" ")}
    >
      <div className="mx-auto max-w-3xl">
        <TaskDetail id={id} />
        {/* id prop pass kiya — TaskDetail localStorage se task dhundhega */}
      </div>
    </main>
  );
}