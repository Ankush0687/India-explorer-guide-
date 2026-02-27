import { Category, categories } from "@/data/tourismData";
import { Mountain, Landmark, Waves, Building2 } from "lucide-react";

interface CategoryFilterProps {
  selected: Category | null;
  onSelect: (c: Category | null) => void;
}

const iconMap: Record<Category, React.ReactNode> = {
  "Hill Station": <Mountain className="h-4 w-4" />,
  Temple: <Landmark className="h-4 w-4" />,
  Beach: <Waves className="h-4 w-4" />,
  Historical: <Building2 className="h-4 w-4" />,
};

const CategoryFilter = ({ selected, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`flex items-center gap-1.5 rounded-full px-4 py-2 font-body text-sm font-medium transition-all duration-200 ${
          selected === null
            ? "bg-primary text-primary-foreground shadow-md"
            : "glass text-foreground hover:bg-muted"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 font-body text-sm font-medium transition-all duration-200 ${
            selected === cat
              ? "bg-primary text-primary-foreground shadow-md"
              : "glass text-foreground hover:bg-muted"
          }`}
        >
          {iconMap[cat]}
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
