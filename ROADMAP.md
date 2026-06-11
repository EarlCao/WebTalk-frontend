# Frontend Development Roadmap (web-talk)

> Context for any AI agent or developer picking up this project: the backend is
> already built (Express + Mongoose + Socket.IO, JWT bearer auth via
> `Authorization: Bearer <token>`, running on port 3030, base path `/api`).
> The frontend is React 19 + TypeScript + Vite + Tailwind/daisyUI +
> react-router-dom + axios + socket.io-client. As of this writing,
> `src/App.tsx` is still the default Vite scaffold and
> `pages/`, `context/`, `lib/`, `hooks/`, `layouts/`, `components/common/`
> are empty/unused.

Build features **vertically** (UI -> real API call -> loading/error states ->
edge cases) and **in this order**, since each phase depends on the previous one.

---

## Phase 0 — Foundation (do this first, before any feature)  ✅ DONE

- [x] `lib/api.ts`: axios instance
  - `baseURL = http://localhost:3030/api` (from `VITE_API_BASE_URL`)
  - request interceptor: attach `Authorization: Bearer <token>` from storage
  - response interceptor: handle 401 (clears session, redirects to `/login`)
- [x] `lib/socket.ts`: socket.io-client instance, connect lazily after login
- [x] `lib/storage.ts`: shared localStorage keys (`webtalk_token`, `webtalk_user`)
- [x] `context/AuthContext.tsx` + `hooks/useAuth.ts`:
  - stores `user` + `token` (persisted in localStorage)
  - exposes `login`, `register`, `logout`, `isAuthenticated`, `isInitializing`
  - connects/disconnects the socket on login/logout/app load
- [x] `layouts/RootLayout.tsx` (top bar + `<Outlet />`, shows current user + sign out)
- [x] `layouts/ProtectedRoute.tsx` (redirect to `/login` if not authenticated)
- [x] `layouts/GuestRoute.tsx` (redirect to `/` if already authenticated — guards login/register)
- [x] `layouts/AuthLayout.tsx` (split-screen layout for auth pages)
- [x] `App.tsx` routing wired with react-router-dom; `main.tsx` wraps the app in
      `BrowserRouter` + `AuthProvider`. Default Vite scaffold removed.
- [x] Tailwind v4 + daisyUI configured (`vite.config.ts` + `src/index.css`,
      custom "webtalk" dark theme, Space Grotesk + Inter fonts via `index.html`)
- [x] `.env` / `.env.example` with `VITE_API_BASE_URL` and `VITE_SOCKET_URL`
- [x] `types/auth.ts` (`User`, `AuthResponse`, `LoginPayload`, `RegisterPayload`)
      and `types/api.ts` (`ApiSuccess`/`ApiError`/`ApiResponse`) matching the
      backend's `sendSuccess`/`sendError` envelope

---

## Phase 1 — Auth  ✅ DONE

Endpoints:
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout` (requires auth)

- [x] `pages/public/Login.tsx`
- [x] `pages/public/Register.tsx` (client-side validation mirrors the backend's
      `RegisterSchema`: username 3–30 chars `[a-zA-Z0-9_.-]`, password 8–64 chars)
- [x] On login/register success: token + user stored via `AuthContext`,
      socket connects, redirect to `/`
- [x] `pages/Home.tsx` — temporary landing page after login (placeholder until
      Phase 4 builds the conversations list)
- [ ] Manual end-to-end check still needed: run backend (`npm run dev` in
      `backend/`, port 3030) and frontend (`npm run dev` in `frontend/`),
      confirm register -> login -> refresh persists session -> logout clears it

---

## Phase 2 — User profile

Endpoints:
- `GET /users/me`
- `PATCH /users/me`
- `DELETE /users/me`

- [ ] Profile page: view/edit display name, avatar, etc.
- [ ] Confirms the authenticated GET/PATCH pattern works end-to-end

---

## Phase 3 — Friends

Endpoints:
- `GET /users` (search), `GET /users/:id`
- `GET /friends`, `DELETE /friends/:id`
- `GET /friends/requests/incoming`, `GET /friends/requests/outgoing`
- `POST /friends/requests`
- `PATCH /friends/requests/:id/accept`
- `PATCH /friends/requests/:id/decline`
- `DELETE /friends/requests/:id`

- [ ] User search page
- [ ] Friends list page (remove friend)
- [ ] Friend requests: incoming/outgoing lists, send/accept/decline/cancel

---

## Phase 4 — Conversations list

Endpoints:
- `GET /conversations`
- `POST /conversations/direct`
- `GET /conversations/:id`

- [ ] Sidebar/list view of conversations
- [ ] "Start chat" action from a friend's profile -> `POST /conversations/direct`
- [ ] Conversation detail shell (no messages yet)

---

## Phase 5 — Messaging (core feature)

Endpoints:
- `GET /messages?conversationId=...` (pagination)
- `POST /messages`
- `PATCH /messages/:id` (edit)
- `DELETE /messages/:id`
- `POST /messages/:id/read`

Socket events available today: `joinRoom`, `leaveRoom`, `userConnected`,
`userDisconnected`, `ping`/`pong`.

- [ ] Join/leave conversation room via socket on enter/exit
- [ ] Fetch + paginate message history
- [ ] Send message (optimistic UI + real API call)
- [ ] Edit / delete message
- [ ] Mark as read
- [ ] Typing indicators / online presence using existing connect/disconnect events

> ⚠️ **Backend gap to flag**: the socket layer currently has no `newMessage`,
> `messageEdited`, `messageDeleted`, or `messageRead` broadcast events. Add
> these emits to the `messages` module's socket handler before/while building
> this phase, otherwise the frontend will need to poll instead of getting
> real-time updates.

---

## Phase 6 — Group conversations

Endpoints:
- `POST /conversations/group`
- `PATCH /conversations/:id` (rename/update group)
- `POST /conversations/:id/participants`
- `DELETE /conversations/:id/participants/:participantId`
- `DELETE /conversations/:id`

- [ ] Create group conversation
- [ ] Manage participants (add/remove)
- [ ] Reuse the Phase 5 messaging UI for group chats

---

## Phase 7 — Notifications

Endpoints:
- `GET /notifications`
- `PATCH /notifications/:id/read`
- `PATCH /notifications/read-all`
- `DELETE /notifications/:id`

- [ ] Bell icon + dropdown/list
- [ ] Unread count badge
- [ ] Mark single / mark all as read, delete

---

## Phase 8 — Polish

- [ ] Loading/empty/error states across all pages
- [ ] Responsive layout
- [ ] Theme toggle (daisyUI)
- [ ] Avatar uploads (if backend supports file storage)

---

## General rule per feature

For each phase: build the page with hardcoded/mock data first, then wire the
real axios call, then handle loading/error states, then wire any socket
events. Don't move to the next phase until the current one works against the
real backend running on port 3030.
