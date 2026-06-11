/**
 * HomePage — the right-panel empty state shown when no conversation
 * is selected. WhatsApp-style "open on desktop" illustration.
 */

const LockIcon = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.8"
    className="inline-block"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const HomePage = () => {
  return (
    <div className="chat-welcome-bg relative flex h-full flex-col items-center justify-center overflow-hidden select-none">

      {/* Decorative background rings */}
      <div
        className="pointer-events-none absolute rounded-full border border-primary/8"
        style={{ width: 480, height: 480 }}
      />
      <div
        className="pointer-events-none absolute rounded-full border border-primary/5"
        style={{ width: 660, height: 660 }}
      />
      <div
        className="pointer-events-none absolute rounded-full border border-primary/3"
        style={{ width: 840, height: 840 }}
      />

      {/* Content card */}
      <div className="relative flex flex-col items-center gap-6 px-8 text-center">

        {/* Illustration */}
        <div className="relative">
          {/* Glow backdrop */}
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-20 bg-primary"
            style={{ transform: "scale(1.4)" }}
          />
          {/* SVG illustration */}
          <svg
            width="220"
            height="160"
            viewBox="0 0 220 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative drop-shadow-xl"
          >
            {/* Laptop body */}
            <rect x="28" y="24" width="164" height="102" rx="10" fill="var(--color-base-200)" stroke="var(--color-base-300)" strokeWidth="2" />
            {/* Laptop screen inner */}
            <rect x="38" y="33" width="144" height="82" rx="6" fill="var(--color-base-100)" />

            {/* Sidebar strip inside screen */}
            <rect x="38" y="33" width="44" height="82" rx="6" fill="var(--color-base-200)" />
            {/* Sidebar header green */}
            <rect x="38" y="33" width="44" height="22" rx="6" fill="var(--color-primary)" />
            <rect x="38" y="47" width="44" height="8" fill="var(--color-primary)" />

            {/* Avatar circles in sidebar */}
            <circle cx="52" cy="74" r="6" fill="var(--color-base-300)" />
            <circle cx="52" cy="93" r="6" fill="var(--color-base-300)" />
            <circle cx="52" cy="108" r="6" fill="var(--color-base-300)" />
            {/* Text lines in sidebar */}
            <rect x="62" y="71" width="14" height="3" rx="1.5" fill="var(--color-base-300)" />
            <rect x="62" y="76" width="10" height="2" rx="1" fill="var(--color-base-300)" opacity="0.6" />
            <rect x="62" y="90" width="14" height="3" rx="1.5" fill="var(--color-base-300)" />
            <rect x="62" y="95" width="10" height="2" rx="1" fill="var(--color-base-300)" opacity="0.6" />
            <rect x="62" y="105" width="14" height="3" rx="1.5" fill="var(--color-base-300)" />
            <rect x="62" y="110" width="10" height="2" rx="1" fill="var(--color-base-300)" opacity="0.6" />

            {/* Chat area — message bubbles */}
            {/* Incoming bubble */}
            <rect x="90" y="42" width="54" height="14" rx="7" fill="var(--color-base-200)" />
            <rect x="90" y="42" width="54" height="14" rx="7" fill="var(--color-base-300)" opacity="0.7" />
            {/* Outgoing bubble */}
            <rect x="118" y="62" width="60" height="14" rx="7" fill="var(--color-primary)" opacity="0.85" />
            {/* Incoming bubble */}
            <rect x="90" y="82" width="48" height="14" rx="7" fill="var(--color-base-300)" opacity="0.7" />
            {/* Outgoing bubble */}
            <rect x="124" y="102" width="54" height="10" rx="5" fill="var(--color-primary)" opacity="0.6" />

            {/* Lock icon over chat area */}
            <circle cx="154" cy="72" r="10" fill="var(--color-primary)" opacity="0.15" />
            <path
              d="M150 73v-2a4 4 0 0 1 8 0v2M148 73h12v6a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-6z"
              stroke="var(--color-primary)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />

            {/* Laptop base */}
            <path d="M10 126h200l-8 8H18l-8-8z" fill="var(--color-base-200)" stroke="var(--color-base-300)" strokeWidth="1.5" />
            {/* Hinge notch */}
            <rect x="96" y="126" width="28" height="4" rx="2" fill="var(--color-base-300)" />
          </svg>
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-[22px] font-semibold tracking-tight text-base-content">
            WebTalk for Desktop
          </h2>
          <p className="max-w-[280px] text-sm leading-relaxed text-base-content/50">
            Select a conversation from the left panel to start chatting, or start a new one.
          </p>
        </div>

        {/* Separator */}
        <div className="flex w-56 items-center gap-3">
          <div className="h-px flex-1 bg-base-300/60" />
          <span className="text-[11px] font-medium uppercase tracking-widest text-base-content/30">
            end-to-end encrypted
          </span>
          <div className="h-px flex-1 bg-base-300/60" />
        </div>

        {/* E2E badge */}
        <p className="flex items-center gap-1.5 rounded-full border border-base-300/50 bg-base-200/50 px-4 py-1.5 text-[12px] text-base-content/40">
          <LockIcon />
          Your messages stay private
        </p>
      </div>
    </div>
  );
};
