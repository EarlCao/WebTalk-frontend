import { useAuth } from "../hooks/useAuth";

/**
 * Temporary landing page for authenticated users. Will be replaced by the
 * conversations list in Phase 4.
 */
export const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">Welcome, {user?.username}</h1>
      <p className="text-base-content/60">
        You're signed in. Conversations and chat will live here once Phase 4 and 5 are built.
      </p>
    </div>
  );
};
