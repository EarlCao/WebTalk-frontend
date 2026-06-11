import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type ToastVariant = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  dismiss: (id: string) => void;
  toast: {
    success: (message: string, duration?: number) => void;
    error:   (message: string, duration?: number) => void;
    info:    (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

let _counter = 0;
const genId = () => `toast-${++_counter}-${Date.now()}`;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const add = useCallback(
    (message: string, variant: ToastVariant, duration = 4000) => {
      const id = genId();
      setToasts((prev) => [...prev, { id, message, variant, duration }]);
      const timer = setTimeout(() => dismiss(id), duration);
      timers.current.set(id, timer);
    },
    [dismiss],
  );

  const toast = useMemo(
    () => ({
      success: (msg: string, dur?: number) => add(msg, "success", dur),
      error:   (msg: string, dur?: number) => add(msg, "error",   dur),
      info:    (msg: string, dur?: number) => add(msg, "info",    dur),
      warning: (msg: string, dur?: number) => add(msg, "warning", dur),
    }),
    [add],
  );

  const value = useMemo(
    () => ({ toasts, dismiss, toast }),
    [toasts, dismiss, toast],
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};
