import React from "react";
import { useThemeStore } from "../store/useThemeStore";
import { themes } from "../store/themes-data";
import { Moon } from "lucide-react";

const ThemeChanger = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="p-6  max-h-screen scrollbar-hidden overflow-y-auto h-full bg-base-100 mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Moon className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold text-primary">Change Theme</h2>
      </div>
      <p className="text-sm">
        Customize your app's appearance by selecting a theme. Your changes will
        be applied instantly.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 max-w-full">
        {themes.map((t) => (
          <button
            key={t}
            className={`group flex flex-col  items-center gap-1.5 p-2 rounded-lg transition-colors ${
              theme === t ? "bg-base-200" : "hover:bg-base-200/50"
            }`}
            onClick={() => setTheme(t)}
          >
            <div
              className="relative h-8 w-full rounded-md overflow-hidden"
              data-theme={t}
            >
              <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                <div className="rounded bg-primary"></div>
                <div className="rounded bg-secondary"></div>
                <div className="rounded bg-accent"></div>
                <div className="rounded bg-neutral"></div>
              </div>
            </div>
            <span className="text-[11px] font-medium truncate w-full text-center">
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeChanger;
