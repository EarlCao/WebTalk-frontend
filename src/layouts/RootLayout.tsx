import { Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

/**
 * Shell for authenticated pages: top bar with branding, current user, and
 * sign-out. Feature pages render into the <Outlet /> below.
 */
export const RootLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-svh flex-col bg-base-100 text-base-content">
      <header className="border-b border-base-300/60 bg-base-200/40">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <span className="font-display text-lg font-semibold tracking-tight">
            web<span className="text-primary">talk</span>
          </span>

          <div className="flex items-center gap-3">
            {user && (
              <div className="flex items-center gap-2">
                <div className="avatar avatar-placeholder">
                  <div className="w-8 rounded-full bg-primary/20 text-primary">
                    <span className="text-sm font-semibold">
                      {user.username.slice(0, 1).toUpperCase()}
                    </span>
                  </div>
                </div>
                <span className="hidden text-sm font-medium sm:inline">{user.username}</span>
              </div>
            )}
            <button type="button" onClick={() => void logout()} className="btn btn-ghost btn-sm">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
};
