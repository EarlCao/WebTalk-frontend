import { Link, Outlet } from "react-router-dom";

const previewMessages = [
  { from: "them", text: "hey, you free to look at the designs?" },
  { from: "me", text: "yep — pulling them up now" },
  { from: "them", text: "no rush, whenever works 🙂" },
];

/**
 * Split layout for the auth pages. Left panel carries the brand and a
 * preview of a live conversation (the product's signature moment); the
 * right panel renders the active form via <Outlet />.
 */
export const AuthLayout = () => {
  return (
    <div className="grid min-h-svh bg-base-100 text-base-content lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-base-200 px-10 py-10 lg:flex">
        <Link to="/" className="font-display text-xl font-semibold tracking-tight">
          web<span className="text-primary">talk</span>
        </Link>

        <div className="flex flex-col gap-3">
          {previewMessages.map((message, index) => (
            <div
              key={message.text}
              className={`flex ${message.from === "me" ? "justify-end" : "justify-start"}`}
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div
                className={`max-w-xs rounded-2xl px-4 py-2 text-sm ${
                  message.from === "me"
                    ? "bg-primary text-primary-content rounded-br-sm"
                    : "bg-base-300 text-base-content rounded-bl-sm"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-base-300 px-4 py-3">
              <span className="size-1.5 animate-bounce rounded-full bg-base-content/50 [animation-delay:-0.3s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-base-content/50 [animation-delay:-0.15s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-base-content/50" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-base-content/60">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-secondary" />
          </span>
          Always-on conversations with friends and groups
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-sm">
          <Link to="/" className="font-display mb-8 inline-block text-xl font-semibold tracking-tight lg:hidden">
            web<span className="text-primary">talk</span>
          </Link>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
