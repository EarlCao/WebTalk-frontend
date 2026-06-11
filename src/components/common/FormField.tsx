import type { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

/**
 * Labeled text input with inline validation message, styled with daisyUI's
 * input classes so it stays consistent across auth and future forms.
 */
export const FormField = ({ label, error, id, ...inputProps }: FormFieldProps) => {
  const fieldId = id ?? inputProps.name;

  return (
    <div className="form-control flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="label-text text-sm font-medium text-base-content/80">
        {label}
      </label>
      <input
        id={fieldId}
        className={`input input-bordered w-full ${error ? "input-error" : ""}`}
        {...inputProps}
      />
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
};
