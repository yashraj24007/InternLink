import { useTheme } from "@/contexts/ThemeProvider";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none border border-border bg-muted flex items-center px-1 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span className={`transition-transform duration-300 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${isDark ? 'translate-x-7 bg-gray-900 text-white' : 'translate-x-0 bg-white text-black'}`}
        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
  {/* Removed Light/Dark text labels for a cleaner toggle */}
    </button>
  );
}
