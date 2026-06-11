import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AppTheme = "webtalk-light" | "webtalk-dark";

interface ThemeContextValue {
  theme: AppTheme;
  isDark: boolean;
  toggleTheme: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_KEY = "webtalk-theme";

const getInitialTheme = (): AppTheme => {
  try {
    const stored = localStorage.getItem(THEME_KEY) as AppTheme | null;
    if (stored === "webtalk-light" || stored === "webtalk-dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "webtalk-dark"
      : "webtalk-light";
  } catch {
    return "webtalk-light";
  }
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<AppTheme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // localStorage unavailable in some environments
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "webtalk-light" ? "webtalk-dark" : "webtalk-light"));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, isDark: theme === "webtalk-dark", toggleTheme }),
    [theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
