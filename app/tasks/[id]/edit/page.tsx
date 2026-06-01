import TaskEditForm from "@/components/TaskEditForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TaskEditPage({ params }: Props) {
  const { id } = await params;

  return (
    <main
      className={[
        "min-h-screen px-4 py-8 sm:px-6 lg:px-8",
        "transition-colors duration-300",
        "bg-slate-50 dark:bg-slate-950",
      ].join(" ")}
    >
      <div className="mx-auto max-w-2xl">
        <TaskEditForm id={id} />
      </div>
    </main>
  );
}