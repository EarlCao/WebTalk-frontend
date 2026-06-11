import axios, { AxiosError } from "axios";

import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "./storage";
import type { ApiError } from "../types/api";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the JWT (if present) to every outgoing request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

// Centralize 401 handling: clear the stored session and let the app
// redirect to /login via the ProtectedRoute / AuthContext state change.
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);

      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }
    }

    return Promise.reject(error);
  },
);

/**
 * Extracts a human-readable error message from an axios error returned by
 * the API, falling back to a generic message.
 */
export const getApiErrorMessage = (error: unknown, fallback = "Something went wrong. Please try again."): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiError | undefined;
    return data?.message ?? fallback;
  }

  return fallback;
};
