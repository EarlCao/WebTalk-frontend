import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

/**
 * Wraps routes that require an authenticated session. Redirects to /login
 * if no session is present, preserving the attempted location isn't needed
 * yet but can be added once deep-linking matters.
 */
export const ProtectedRoute = () => {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
