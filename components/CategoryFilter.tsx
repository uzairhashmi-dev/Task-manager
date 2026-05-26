import type { TaskCategoryFilter } from "@/types/task";

type CategoryFilterProps = {
  activeCategory: TaskCategoryFilter;
  onCategoryChange: (category: TaskCategoryFilter) => void;
};

const categories: { label: string; value: TaskCategoryFilter }[] = [
  { label: "All", value: "all" },
  { label: "Work", value: "work" },
  { label: "Personal", value: "personal" },
  { label: "Study", value: "study" },
  { label: "Other", value: "other" },
];

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.value;
        return (
          <button
            key={cat.value}
            type="button"
            onClick={() => onCategoryChange(cat.value)}
            className={[
              "rounded-full px-4 py-2 text-sm font-medium transition",
              isActive
                ? "bg-cyan-500 dark:bg-cyan-400 text-white dark:text-slate-950"
                : [
                    "bg-slate-100 dark:bg-slate-800",
                    "text-slate-600 dark:text-slate-300",
                    "hover:bg-slate-200 dark:hover:bg-slate-700",
                    "hover:text-slate-900 dark:hover:text-white",
                  ].join(" "),
            ].join(" ")}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}