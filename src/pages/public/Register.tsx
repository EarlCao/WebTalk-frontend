import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { FormField } from "../../components/common/FormField";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";

/* ── Validation ──────────────────────────────────────────────────── */
const USERNAME_PATTERN = /^[a-zA-Z0-9_.-]+$/;

interface FieldErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const validate = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
): FieldErrors => {
  const errors: FieldErrors = {};

  if (username.length < 3 || username.length > 30) {
    errors.username = "Username must be 3–30 characters.";
  } else if (!USERNAME_PATTERN.test(username)) {
    errors.username = "Use only letters, numbers, underscores, dots, and hyphens.";
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (password.length < 8 || password.length > 64) {
    errors.password = "Password must be 8–64 characters.";
  }

  if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};

/* ── RegisterPage ────────────────────────────────────────────────── */
export const RegisterPage = () => {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaving, setLeaving] = useState(false);

  /* ── Animated navigation ──────────────────────────────────────── */
  const handleNavigate = (to: string) => {
    setLeaving(true);
    setTimeout(() => navigate(to), 230);
  };

  /* ── Submit ───────────────────────────────────────────────────── */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validate(username, email, password, confirmPassword);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);

    try {
      await register({ username, email, password });
      toast.success(`Account created! Welcome, ${username} 🎉`, 5000);
      navigate("/", { replace: true });
    } catch (caughtError) {
      toast.error(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to create your account. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`auth-page-root${leaving ? " leaving" : ""}`}>
      {/* ── Header ──────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <p className="mt-1 text-sm text-base-content/60">It only takes a moment.</p>
      </div>

      {/* ── Form card ───────────────────────────────────────────── */}
      <div className="auth-card mt-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <FormField
            label="Username"
            name="username"
            autoComplete="username"
            placeholder="janedoe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={fieldErrors.username}
            required
          />
          <FormField
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={fieldErrors.email}
            required
          />
          <FormField
            label="Password"
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
            required
          />
          <FormField
            label="Confirm password"
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={fieldErrors.confirmPassword}
            required
          />

          <button
            type="submit"
            className="btn btn-primary mt-1 active:scale-[0.97] transition-transform duration-100"
            disabled={isSubmitting}
          >
            {isSubmitting && <span className="loading loading-spinner loading-sm" />}
            Create account
          </button>
        </form>
      </div>

      {/* ── Footer link ─────────────────────────────────────────── */}
      <p className="mt-5 text-center text-sm text-base-content/60">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => handleNavigate("/login")}
          className="auth-link-btn link link-primary font-medium"
        >
          Sign in
        </button>
      </p>
    </div>
  );
};
