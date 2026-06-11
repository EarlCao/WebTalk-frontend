import { useToast, type ToastItem, type ToastVariant } from "../../context/ToastContext";

/* ── Per-variant config ─────────────────────────────────────── */
const VARIANT_CONFIG: Record<
  ToastVariant,
  { borderColor: string; iconBg: string; label: string; icon: React.ReactNode }
> = {
  success: {
    borderColor: "border-success",
    iconBg: "bg-success text-success-content",
    label: "Success",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
  },
  error: {
    borderColor: "border-error",
    iconBg: "bg-error text-error-content",
    label: "Error",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  },
  warning: {
    borderColor: "border-warning",
    iconBg: "bg-warning text-warning-content",
    label: "Warning",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  info: {
    borderColor: "border-info",
    iconBg: "bg-info text-info-content",
    label: "Info",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    ),
  },
};

/* ── Progress bar color map ─────────────────────────────────── */
const PROGRESS_COLOR: Record<ToastVariant, string> = {
  success: "bg-success",
  error:   "bg-error",
  warning: "bg-warning",
  info:    "bg-info",
};

/* ── Single toast card ──────────────────────────────────────── */
const ToastCard = ({ toast }: { toast: ToastItem }) => {
  const { dismiss } = useToast();
  const cfg = VARIANT_CONFIG[toast.variant];

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`
        relative flex w-80 items-start gap-3 overflow-hidden rounded-xl
        border-l-4 ${cfg.borderColor}
        bg-base-100 shadow-xl shadow-black/10
        p-4
      `}
      style={{ animation: "toast-slide-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both" }}
    >
      {/* Icon pill */}
      <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${cfg.iconBg}`}>
        {cfg.icon}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wide text-base-content/40">
          {cfg.label}
        </p>
        <p className="text-sm leading-snug text-base-content">{toast.message}</p>
      </div>

      {/* Dismiss */}
      <button
        type="button"
        onClick={() => dismiss(toast.id)}
        aria-label="Dismiss notification"
        className="mt-0.5 flex-shrink-0 text-base-content/30 transition-colors hover:text-base-content/70"
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Progress bar */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] ${PROGRESS_COLOR[toast.variant]} opacity-50`}
        style={{ animation: `toast-progress ${toast.duration}ms linear both` }}
      />
    </div>
  );
};

/* ── Toast container (mount once at app root) ───────────────── */
export const ToastContainer = () => {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-label="Notifications"
      className="fixed right-4 top-4 z-[9999] flex flex-col gap-2.5"
    >
      {toasts.map((t) => (
        <ToastCard key={t.id} toast={t} />
      ))}
    </div>
  );
};
