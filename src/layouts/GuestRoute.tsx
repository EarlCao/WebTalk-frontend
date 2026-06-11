import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

/**
 * Wraps the public-only routes (login/register). If the user already has a
 * session, send them straight into the app instead of showing the form.
 */
export const GuestRoute = () => {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
