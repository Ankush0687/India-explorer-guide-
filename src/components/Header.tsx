import { Sun, Moon, Search } from "lucide-react";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const Header = ({ isDark, onToggleTheme, searchQuery, onSearchChange }: HeaderProps) => {
  return (
    <header className="glass-strong sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <h2 className="font-display text-lg font-bold text-foreground md:text-xl">
          <span className="text-gradient">Incredible India</span>{" "}
          <span className="hidden text-muted-foreground sm:inline">Tourism Guide</span>
        </h2>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search places..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-9 w-40 rounded-full border border-border bg-background/80 pl-9 pr-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 md:w-64"
            />
          </div>

          <button
            onClick={onToggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-foreground transition-colors hover:bg-muted"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Google Translate */}
      <div id="google_translate_element" className="hidden" />
    </header>
  );
};

export default Header;
