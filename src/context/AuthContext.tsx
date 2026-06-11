import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import { api, getApiErrorMessage } from "../lib/api";
import { connectSocket, disconnectSocket } from "../lib/socket";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../lib/storage";
import type { ApiSuccess } from "../types/api";
import type { AuthResponse, LoginPayload, RegisterPayload, User } from "../types/auth";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const readStoredUser = (): User | null => {
  const raw = localStorage.getItem(USER_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [user, setUser] = useState<User | null>(() => readStoredUser());
  // The session is read synchronously from localStorage above, so there's
  // no async "loading" phase yet. Kept as `false`/state (rather than a
  // plain constant) so a future async check (e.g. verifying the token with
  // the backend) can flip it without changing the AuthContext shape.
  const [isInitializing] = useState(false);

  const persistSession = useCallback((data: AuthResponse) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    connectSocket(data.token);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setToken(null);
    setUser(null);
    disconnectSocket();
  }, []);

  const login = useCallback(
    async (payload: LoginPayload) => {
      try {
        const response = await api.post<ApiSuccess<AuthResponse>>("/auth/login", payload);

        if (!response.data.data) {
          throw new Error("Login response did not include session data.");
        }

        persistSession(response.data.data);
      } catch (error) {
        throw new Error(getApiErrorMessage(error, "Unable to log in. Check your credentials and try again."), {
          cause: error,
        });
      }
    },
    [persistSession],
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      try {
        const response = await api.post<ApiSuccess<AuthResponse>>("/auth/register", payload);

        if (!response.data.data) {
          throw new Error("Register response did not include session data.");
        }

        persistSession(response.data.data);
      } catch (error) {
        throw new Error(getApiErrorMessage(error, "Unable to create your account. Please try again."), {
          cause: error,
        });
      }
    },
    [persistSession],
  );

  const logout = useCallback(async () => {
    try {
      if (token) {
        await api.post("/auth/logout");
      }
    } catch {
      // Even if the server call fails, clear the local session so the
      // user can always sign out from the UI.
    } finally {
      clearSession();
    }
  }, [token, clearSession]);

  // Reconnect the socket on initial load if a session was already stored.
  useEffect(() => {
    if (token) {
      connectSocket(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isInitializing,
      login,
      register,
      logout,
    }),
    [user, token, isInitializing, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
