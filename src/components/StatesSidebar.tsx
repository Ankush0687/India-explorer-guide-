import { IndianState } from "@/data/tourismData";
import { MapPin } from "lucide-react";

interface StatesSidebarProps {
  states: IndianState[];
  selectedStateId: string | null;
  onSelectState: (id: string) => void;
}

const StatesSidebar = ({ states, selectedStateId, onSelectState }: StatesSidebarProps) => {
  return (
    <aside className="glass scrollbar-hide h-fit w-full overflow-y-auto rounded-2xl p-2 md:sticky md:top-20 md:max-h-[calc(100vh-6rem)] md:w-64 md:shrink-0">
      <h3 className="px-3 py-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Indian States
      </h3>
      <nav className="flex gap-1 overflow-x-auto md:flex-col md:overflow-x-visible">
        {states.map((state) => (
          <button
            key={state.id}
            onClick={() => onSelectState(state.id)}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 font-body text-sm transition-all duration-200 md:w-full ${
              selectedStateId === state.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <img
              src={state.image}
              alt={state.name}
              className="hidden h-8 w-8 rounded-lg object-cover md:block"
            />
            <div className="flex items-center gap-1.5 whitespace-nowrap md:whitespace-normal">
              <MapPin className="h-3.5 w-3.5 shrink-0 md:hidden" />
              <span className="font-medium">{state.name}</span>
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default StatesSidebar;
