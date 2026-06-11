import { Outlet } from "react-router-dom";

import { Sidebar } from "../components/common/Sidebar";

/**
 * Root shell for all authenticated pages.
 * Full-viewport flex layout: fixed-width Sidebar on the left,
 * scrollable chat panel on the right via <Outlet />.
 */
export const RootLayout = () => {
  return (
    <div className="flex h-svh overflow-hidden bg-base-100 text-base-content">
      {/* ── Left panel: Sidebar (desktop only, hidden on mobile) ── */}
      <Sidebar />

      {/* ── Right panel: active conversation / empty state ─────── */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};
