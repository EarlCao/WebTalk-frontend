import { useState, type InputHTMLAttributes } from "react";

/* ── Eye icons ─────────────────────────────────────────────────── */
const EyeIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
    />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
    />
    <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" />
  </svg>
);

/* ── FormField ─────────────────────────────────────────────────── */
interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

/**
 * Labeled text input with inline validation message, styled with daisyUI's
 * input classes so it stays consistent across auth and future forms.
 *
 * Password fields automatically get an eye-toggle button.
 */
export const FormField = ({ label, error, id, type, ...inputProps }: FormFieldProps) => {
  const fieldId = id ?? inputProps.name;
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const resolvedType = isPassword ? (showPassword ? "text" : "password") : (type ?? "text");

  return (
    <div className="form-control flex flex-col gap-1.5">
      <label
        htmlFor={fieldId}
        className="label-text text-sm font-medium text-base-content/80"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={fieldId}
          type={resolvedType}
          className={[
            "input input-bordered w-full",
            error ? "input-error" : "",
            isPassword ? "pr-10" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          {...inputProps}
        />

        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((v) => !v)}
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              text-base-content/35 hover:text-primary
              transition-all duration-150
              hover:scale-110 active:scale-95
            "
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
};
