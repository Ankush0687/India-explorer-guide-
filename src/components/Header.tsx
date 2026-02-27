import { Sun, Moon, Search, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "bn", label: "বাংলা" },
  { code: "ml", label: "മലയാളം" },
  { code: "mr", label: "मराठी" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "ur", label: "اردو" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
  { code: "zh-CN", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "ar", label: "العربية" },
  { code: "ru", label: "Русский" },
  { code: "pt", label: "Português" },
];

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; autoDisplay: boolean },
          elementId: string
        ) => void;
      };
    };
  }
}

const Header = ({ isDark, onToggleTheme, searchQuery, onSearchChange }: HeaderProps) => {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  // Load Google Translate script once
  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "google_translate_element"
        );
      }
    };

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Hide the default Google Translate bar
    const style = document.createElement("style");
    style.textContent = `
      .goog-te-banner-frame, .skiptranslate, #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
      body { top: 0 !important; }
      .goog-text-highlight { background: none !important; box-shadow: none !important; }
    `;
    document.head.appendChild(style);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectLanguage = (code: string) => {
    setCurrentLang(code);
    setLangOpen(false);

    // Trigger Google Translate
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event("change"));
    }
  };

  const activeLang = LANGUAGES.find((l) => l.code === currentLang);

  return (
    <header className="glass-strong sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <h2 className="font-display text-lg font-bold text-foreground md:text-xl">
          <span className="text-gradient">Incredible India</span>{" "}
          <span className="hidden text-muted-foreground sm:inline">Tourism Guide</span>
        </h2>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search places..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-9 w-32 rounded-full border border-border bg-background/80 pl-9 pr-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 sm:w-40 md:w-64"
            />
          </div>

          {/* Language selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 font-body text-sm text-foreground transition-colors hover:bg-muted"
              aria-label="Select language"
            >
              <Globe className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">{activeLang?.label ?? "English"}</span>
            </button>

            {langOpen && (
              <div className="glass-strong absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-xl py-1 shadow-lg">
                <div className="scrollbar-hide max-h-72 overflow-y-auto">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => selectLanguage(lang.code)}
                      className={`flex w-full items-center gap-2 px-4 py-2 font-body text-sm transition-colors ${
                        currentLang === lang.code
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
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

      {/* Hidden Google Translate widget */}
      <div id="google_translate_element" className="hidden" />
    </header>
  );
};

export default Header;
