import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { FormField } from "../../components/common/FormField";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";

export const LoginPage = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaving, setLeaving] = useState(false);

  /* ── Animated navigation ──────────────────────────────────────── */
  const handleNavigate = (to: string) => {
    setLeaving(true);
    setTimeout(() => navigate(to), 230);
  };

  const handleForgotPassword = () => {
    toast.success("Password reset coming soon! 🔐", 3000);
  };

  /* ── Submit ───────────────────────────────────────────────────── */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await login({ email, password });
      const name = email.split("@")[0];
      toast.success(`Welcome back, ${name}! 👋`);
      navigate("/", { replace: true });
    } catch (caughtError) {
      toast.error(
        caughtError instanceof Error ? caughtError.message : "Unable to sign in. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`auth-page-root${leaving ? " leaving" : ""}`}>
      {/* ── Header ──────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/5 shadow-inner ring-1 ring-base-content/10 overflow-hidden">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-semibold">Welcome back</h1>
        </div>
        <p className="mt-2 text-sm text-base-content/60">Sign in to pick up your conversations.</p>
      </div>

      {/* ── Form card ───────────────────────────────────────────── */}
      <div className="auth-card mt-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <FormField
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="flex flex-col gap-1">
            <FormField
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={handleForgotPassword}
              className="auth-forgot-btn self-end text-xs text-base-content/45 hover:text-primary"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-1 active:scale-[0.97] transition-transform duration-100"
            disabled={isSubmitting}
          >
            {isSubmitting && <span className="loading loading-spinner loading-sm" />}
            Sign in
          </button>
        </form>
      </div>

      {/* ── Footer link ─────────────────────────────────────────── */}
      <p className="mt-5 text-center text-sm text-base-content/60">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => handleNavigate("/register")}
          className="auth-link-btn link link-primary font-medium"
        >
          Create one
        </button>
      </p>
    </div>
  );
};
