import { Link, Outlet } from "react-router-dom";

/* ── Feature list ────────────────────────────────────────────── */
const FEATURES = [
  {
    label: "End-to-end encrypted",
    sub: "Every message is private by default",
    icon: (
      <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.9">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path strokeLinecap="round" d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    label: "Real-time delivery",
    sub: "Instant messages with live typing indicators",
    icon: (
      <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.9">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    label: "Groups & direct chats",
    sub: "Stay connected with everyone that matters",
    icon: (
      <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.9">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

/* ── Chat preview messages inside the phone mockup ───────────── */
const CHAT_PREVIEW = [
  { from: "them", text: "Ready for the team sync? 🚀", time: "10:41" },
  { from: "me",   text: "Already here! 👋",             time: "10:42" },
  { from: "them", text: "Sharing screen now",            time: "10:42" },
  { from: "me",   text: "Looks great, let's ship ✅",   time: "10:43" },
];

/* ── Double-tick icon (read receipt) ─────────────────────────── */
const ReadTick = () => (
  <svg width="14" height="9" viewBox="0 0 18 11" fill="none" className="inline-block ml-1 align-middle">
    <path d="M1 5.5L5.5 10L17 1" stroke="#53BDEB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 5.5L9.5 9" stroke="#53BDEB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
  </svg>
);

/* ── Phone mockup ─────────────────────────────────────────────── */
const PhoneMockup = () => (
  <div
    className="relative overflow-hidden"
    style={{
      width: 232,
      borderRadius: "2.25rem",
      border: "5px solid rgba(255,255,255,0.10)",
      background: "#111B21",
      boxShadow:
        "0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05), inset 0 0 0 1px rgba(255,255,255,0.04)",
    }}
  >
    {/* ── Chat header ─────────────────────────────────────── */}
    <div
      className="flex items-center justify-between px-3.5 pt-3.5 pb-2.5"
      style={{ background: "#075E54" }}
    >
      <div className="flex items-center gap-2">
        {/* Back arrow */}
        <svg width="12" height="12" fill="white" viewBox="0 0 24 24" className="opacity-80">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
        {/* Avatar */}
        <div
          className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white"
          style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
        >
          AC
        </div>
        <div>
          <p className="text-[11px] font-semibold leading-none text-white">Alex Chen</p>
          <p className="mt-0.5 text-[9px] leading-none text-white/55">online</p>
        </div>
      </div>
      <div className="flex items-center gap-2.5 text-white/65">
        <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
        </svg>
        <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      </div>
    </div>

    {/* ── Chat wallpaper + messages ────────────────────────── */}
    <div
      className="relative flex flex-col gap-1.5 px-3 py-3"
      style={{
        minHeight: 210,
        background: "#0B141A",
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.018) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      {/* Date chip */}
      <div className="mx-auto mb-1 rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[9px] text-white/40">
        TODAY
      </div>

      {CHAT_PREVIEW.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
          style={{
            animation: "auth-bubble-in 0.38s cubic-bezier(.34,1.36,.64,1) both",
            animationDelay: `${0.5 + i * 0.22}s`,
            opacity: 0,
          }}
        >
          <div
            className="relative max-w-[76%] rounded-xl px-2.5 py-1.5 text-[11px] leading-snug"
            style={{
              background: msg.from === "me" ? "#005C4B" : "#202C33",
              borderRadius:
                msg.from === "me"
                  ? "12px 12px 3px 12px"
                  : "12px 12px 12px 3px",
              color: msg.from === "me" ? "#E9EDEF" : "#D1D7DB",
            }}
          >
            {msg.text}
            <span className="ml-1.5 inline-flex items-center gap-0.5 text-[9px] opacity-45 align-bottom">
              {msg.time}
              {msg.from === "me" && <ReadTick />}
            </span>
          </div>
        </div>
      ))}

      {/* Typing indicator */}
      <div
        className="flex justify-start"
        style={{
          animation: "auth-bubble-in 0.38s cubic-bezier(.34,1.36,.64,1) both",
          animationDelay: "1.55s",
          opacity: 0,
        }}
      >
        <div
          className="flex items-center gap-1 px-3 py-2"
          style={{ background: "#202C33", borderRadius: "12px 12px 12px 3px" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce" />
        </div>
      </div>
    </div>

    {/* ── Input bar ───────────────────────────────────────── */}
    <div
      className="flex items-center gap-2 px-3 py-2.5"
      style={{ background: "#1F2C34" }}
    >
      <div className="flex-1 rounded-full px-3 py-1.5 text-[10px]" style={{ background: "#2A3942", color: "rgba(255,255,255,0.25)" }}>
        Message…
      </div>
      <div
        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
        style={{ background: "#00A884" }}
      >
        <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </div>
    </div>
  </div>
);

/* ── AuthLayout ───────────────────────────────────────────────── */
export const AuthLayout = () => {
  return (
    <div className="grid min-h-svh bg-base-100 text-base-content lg:grid-cols-2">

      {/* ════════════════════════════════════════════════════
          LEFT PANEL
      ════════════════════════════════════════════════════ */}
      <div className="auth-left-bg relative hidden overflow-hidden lg:flex flex-col">

        {/* ── Brand ─────────────────────────────────────────── */}
        <div className="relative z-10 flex items-center gap-2.5 px-9 pt-9 pb-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 shadow-inner ring-1 ring-white/10">
            <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
          <span className="font-display text-[20px] font-semibold tracking-tight text-white">
            web<span className="text-white/50">talk</span>
          </span>
        </div>

        {/* ── Center: phone + tagline ────────────────────────── */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-7 px-8">
          {/* Glowing halo behind the phone */}
          <div
            className="pointer-events-none absolute"
            style={{
              width: 340,
              height: 340,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(37,211,102,0.18) 0%, transparent 70%)",
              filter: "blur(24px)",
            }}
          />

          <PhoneMockup />

          <div className="text-center">
            <h2 className="font-display text-[22px] font-semibold tracking-tight text-white">
              Chat, connect, collaborate.
            </h2>
            <p className="mt-1.5 max-w-[260px] text-sm leading-relaxed text-white/45">
              Real-time conversations for teams and friends, beautifully simple.
            </p>
          </div>
        </div>

        {/* ── Features strip ────────────────────────────────── */}
        <div className="relative z-10 flex flex-col gap-4 border-t border-white/10 px-9 py-7">
          {FEATURES.map((f) => (
            <div key={f.label} className="flex items-start gap-3">
              <div className="mt-px flex-shrink-0 rounded-lg bg-white/10 p-2 text-white/70">
                {f.icon}
              </div>
              <div>
                <p className="text-[13px] font-semibold leading-snug text-white/90">{f.label}</p>
                <p className="text-[11px] leading-snug text-white/40">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          RIGHT PANEL  (form via Outlet)
      ════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-sm">
          {/* Mobile-only brand */}
          <Link
            to="/"
            className="font-display mb-8 inline-flex items-center gap-2 text-xl font-semibold tracking-tight lg:hidden"
          >
            web<span className="text-primary">talk</span>
          </Link>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
