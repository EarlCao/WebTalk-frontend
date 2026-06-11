import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await login({ email, password });
      // Derive a friendly name from the email prefix for the greeting
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
