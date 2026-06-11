import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FormField } from "../../components/common/FormField";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";

const USERNAME_PATTERN = /^[a-zA-Z0-9_.-]+$/;

interface FieldErrors {
  username?: string;
  email?: string;
  password?: string;
}

const validate = (username: string, email: string, password: string): FieldErrors => {
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

  return errors;
};

export const RegisterPage = () => {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validate(username, email, password);
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
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <p className="mt-1 text-sm text-base-content/60">It only takes a moment.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <FormField
          label="Username"
          name="username"
          autoComplete="username"
          placeholder="janedoe"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
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
          onChange={(event) => setEmail(event.target.value)}
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
          onChange={(event) => setPassword(event.target.value)}
          error={fieldErrors.password}
          required
        />

        <button type="submit" className="btn btn-primary mt-2" disabled={isSubmitting}>
          {isSubmitting && <span className="loading loading-spinner loading-sm" />}
          Create account
        </button>
      </form>

      <p className="text-center text-sm text-base-content/60">
        Already have an account?{" "}
        <Link to="/login" className="link link-primary font-medium no-underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};
