import { useState } from "react";

import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";

/* ── Mock conversations (Phase 4 will replace with real API) ── */
const MOCK_CONVERSATIONS = [
  { id: 1,  name: "Alex Chen",       initials: "AC", lastMsg: "Hey! Are you free tomorrow?",        time: "10:42",     unread: 3,  online: true,  typing: false, isGroup: false },
  { id: 2,  name: "Maria Santos",    initials: "MS", lastMsg: "The files have been sent ✓✓",         time: "9:15",      unread: 0,  online: true,  typing: true,  isGroup: false },
  { id: 3,  name: "Dev Team 🚀",     initials: "DT", lastMsg: "Build passed! Deploying now...",      time: "Yesterday", unread: 12, online: false, typing: false, isGroup: true  },
  { id: 4,  name: "Jordan Lee",      initials: "JL", lastMsg: "Thanks for the help! 🙏",             time: "Yesterday", unread: 0,  online: false, typing: false, isGroup: false },
  { id: 5,  name: "Priya Nair",      initials: "PN", lastMsg: "Can we reschedule the call?",         time: "Mon",       unread: 1,  online: true,  typing: false, isGroup: false },
  { id: 6,  name: "Product Updates", initials: "PU", lastMsg: "v2.4.1 is now live 🎉",               time: "Sun",       unread: 0,  online: false, typing: false, isGroup: true  },
  { id: 7,  name: "Sam Rivera",      initials: "SR", lastMsg: "On my way! 🚗",                        time: "Sat",       unread: 0,  online: false, typing: false, isGroup: false },
  { id: 8,  name: "Leah Kim",        initials: "LK", lastMsg: "Did you see the latest update?",      time: "Fri",       unread: 0,  online: true,  typing: false, isGroup: false },
];

/* Avatar gradient palette — green family */
const AVATAR_GRADIENTS = [
  ["#128C7E", "#075E54"],
  ["#25D366", "#1FAD58"],
  ["#00A884", "#007E62"],
  ["#34B7F1", "#1D8AAA"],
  ["#075E54", "#043D37"],
  ["#2DB35C", "#1A8040"],
];

type FilterTab = "all" | "unread" | "groups";

/* ── Sub-components ─────────────────────────────────────────── */

const ConvAvatar = ({
  name,
  initials,
  colorIdx,
  online,
  isGroup,
}: {
  name: string;
  initials: string;
  colorIdx: number;
  online?: boolean;
  isGroup?: boolean;
}) => {
  const [from, to] = AVATAR_GRADIENTS[colorIdx % AVATAR_GRADIENTS.length];
  return (
    <div className="relative flex-shrink-0">
      <div
        className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white select-none"
        style={{
          background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
          boxShadow: `0 2px 8px ${from}55`,
        }}
        title={name}
      >
        {isGroup ? (
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
        ) : (
          initials
        )}
      </div>

      {!isGroup && online !== undefined && (
        <span
          className={`absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-base-100 ${online ? "bg-success" : "bg-base-300"}`}
        />
      )}
    </div>
  );
};

const TypingDots = () => (
  <span className="inline-flex items-center gap-0.5">
    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
  </span>
);

/* ── Icons ──────────────────────────────────────────────────── */
const IconSearch = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);
const IconNewChat = () => (
  <svg width="19" height="19" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
  </svg>
);
const IconSun = () => (
  <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);
const IconMoon = () => (
  <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const IconMenu = () => (
  <svg width="19" height="19" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);
const IconSignOut = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);
const IconEmptyChat = () => (
  <svg width="44" height="44" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2" className="text-base-content/20">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
  </svg>
);

/* ── Main Sidebar ───────────────────────────────────────────── */
export const Sidebar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { toast } = useToast();

  const [filter, setFilter]   = useState<FilterTab>("all");
  const [search, setSearch]   = useState("");
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      // Toast persists across the route redirect because ToastContainer
      // lives above the router in the tree (mounted in main.tsx).
      toast.info("You've been signed out. See you soon! 👋");
    } catch {
      toast.error("Sign out failed — please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const totalUnread = MOCK_CONVERSATIONS.reduce((n, c) => n + (c.unread > 0 ? 1 : 0), 0);

  const filtered = MOCK_CONVERSATIONS.filter((c) => {
    if (filter === "unread") return c.unread > 0;
    if (filter === "groups") return c.isGroup;
    return true;
  }).filter(
    (c) => !search.trim() || c.name.toLowerCase().includes(search.toLowerCase()),
  );

  const userInitials = (user?.username ?? "Me").slice(0, 2).toUpperCase();

  return (
    <aside className="hidden md:flex flex-col w-[340px] min-w-[340px] h-screen border-r border-base-300/60 bg-base-100 overflow-hidden">

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="sidebar-header-bg relative flex items-center gap-3 px-4 py-3.5 shrink-0">
        {/* User avatar with pulse ring */}
        <div className="relative flex-shrink-0 cursor-pointer group">
          <span
            className="absolute inset-0 rounded-full ring-2 ring-white/50 opacity-0 group-hover:opacity-100"
            style={{ animation: "avatar-ring-pulse 2s ease-in-out infinite" }}
          />
          <div className="relative z-10 h-10 w-10 rounded-full bg-white/20 ring-2 ring-white/30 flex items-center justify-center text-sm font-bold text-white select-none">
            {userInitials}
          </div>
        </div>

        {/* Brand */}
        <span className="font-display text-[15px] font-semibold tracking-tight text-white flex-1 select-none">
          web<span className="opacity-60">talk</span>
        </span>

        {/* Action icons */}
        <div className="flex items-center gap-0.5">
          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="btn btn-ghost btn-sm btn-circle text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isDark ? <IconSun /> : <IconMoon />}
          </button>

          {/* New chat */}
          <button
            type="button"
            title="New conversation"
            className="btn btn-ghost btn-sm btn-circle text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <IconNewChat />
          </button>

          {/* Menu dropdown */}
          <div className="dropdown dropdown-end">
            <button
              type="button"
              tabIndex={0}
              title="More options"
              className="btn btn-ghost btn-sm btn-circle text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <IconMenu />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-200 rounded-box z-20 w-44 p-1 shadow-2xl border border-base-300/60 mt-1"
            >
              <li>
                <span className="text-sm text-base-content/60 px-3 py-1 font-medium">
                  {user?.username}
                </span>
              </li>
              <div className="my-1 border-t border-base-300/60" />
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="text-sm text-error hover:bg-error/10 rounded-md"
                >
                  {isLoggingOut && <span className="loading loading-spinner loading-xs" />}
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Search ─────────────────────────────────────────── */}
      <div className="bg-base-200 px-3 py-2.5 shrink-0">
        <label className="relative flex items-center">
          <span className="absolute left-3 text-base-content/40 pointer-events-none">
            <IconSearch />
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search or start new chat"
            className="
              w-full rounded-xl bg-base-100 py-2 pl-9 pr-4 text-sm
              placeholder:text-base-content/40 border-none outline-none
              focus:ring-1 focus:ring-primary/30 transition-shadow
            "
          />
        </label>
      </div>

      {/* ── Filter chips ───────────────────────────────────── */}
      <div className="flex gap-1.5 bg-base-200 px-3 pb-2.5 shrink-0">
        {(
          [
            ["all",    "All"],
            ["unread", totalUnread > 0 ? `Unread  ${totalUnread}` : "Unread"],
            ["groups", "Groups"],
          ] as const
        ).map(([val, label]) => (
          <button
            key={val}
            type="button"
            onClick={() => setFilter(val)}
            className={`
              rounded-full border px-3 py-[3px] text-xs font-semibold transition-all
              ${
                filter === val
                  ? "border-primary/40 bg-primary/15 text-primary"
                  : "border-base-300 bg-transparent text-base-content/50 hover:bg-base-300/60"
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Conversation list ──────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
            <IconEmptyChat />
            <p className="text-sm text-base-content/40">
              {search ? `No results for "${search}"` : "No conversations yet"}
            </p>
          </div>
        ) : (
          filtered.map((conv, idx) => (
            <button
              key={conv.id}
              type="button"
              onClick={() => setActiveId(conv.id)}
              className={`
                group w-full flex items-center gap-3 px-4 py-3 text-left
                border-l-[3px] transition-colors
                ${
                  activeId === conv.id
                    ? "border-primary bg-primary/10"
                    : "border-transparent hover:bg-base-200/70"
                }
              `}
            >
              <ConvAvatar
                name={conv.name}
                initials={conv.initials}
                colorIdx={idx}
                online={conv.online}
                isGroup={conv.isGroup}
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span
                    className={`truncate text-sm font-semibold ${
                      conv.unread > 0 ? "text-base-content" : "text-base-content/80"
                    }`}
                  >
                    {conv.name}
                  </span>
                  <span
                    className={`flex-shrink-0 text-[11px] ${
                      conv.unread > 0 ? "font-semibold text-primary" : "text-base-content/40"
                    }`}
                  >
                    {conv.time}
                  </span>
                </div>

                <div className="mt-0.5 flex items-center justify-between gap-2">
                  {conv.typing ? (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
                      <TypingDots />
                      typing…
                    </span>
                  ) : (
                    <span className="truncate text-xs text-base-content/50">
                      {conv.lastMsg}
                    </span>
                  )}

                  {conv.unread > 0 && (
                    <span className="flex h-5 min-w-[20px] flex-shrink-0 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-content">
                      {conv.unread > 99 ? "99+" : conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* ── Footer ─────────────────────────────────────────── */}
      <div className="flex items-center gap-2.5 border-t border-base-300/60 bg-base-200/60 px-4 py-2.5 shrink-0">
        {/* Avatar */}
        <div className="h-7 w-7 flex-shrink-0 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold select-none">
          {userInitials}
        </div>

        {/* Username */}
        <span className="flex-1 truncate text-xs font-medium text-base-content/60">
          {user?.username}
        </span>

        {/* Online badge */}
        <span className="flex items-center gap-1 text-[10px] text-success font-medium">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          Online
        </span>

        {/* ── Logout button ─────────────────────────────── */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          title="Sign out"
          className="
            ml-1 flex h-7 w-7 flex-shrink-0 items-center justify-center
            rounded-full text-base-content/35
            hover:bg-error/10 hover:text-error
            transition-colors disabled:opacity-50
          "
        >
          {isLoggingOut
            ? <span className="loading loading-spinner loading-xs" />
            : <IconSignOut />
          }
        </button>
      </div>
    </aside>
  );
};
