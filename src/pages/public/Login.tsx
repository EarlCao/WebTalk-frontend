import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FormField } from "../../components/common/FormField";
import { useAuth } from "../../hooks/useAuth";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate("/", { replace: true });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to log in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="mt-1 text-sm text-base-content/60">Sign in to pick up your conversations.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <FormField
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && (
          <div role="alert" className="alert alert-error alert-soft text-sm">
            <span>{error}</span>
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-2" disabled={isSubmitting}>
          {isSubmitting && <span className="loading loading-spinner loading-sm" />}
          Sign in
        </button>
      </form>

      <p className="text-center text-sm text-base-content/60">
        Don't have an account?{" "}
        <Link to="/register" className="link link-primary font-medium no-underline">
          Create one
        </Link>
      </p>
    </div>
  );
};
