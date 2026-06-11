import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

/**
 * Returns the shared socket.io connection, creating it on first use.
 * Pass the current JWT so the server can identify the user on connect.
 */
export const getSocket = (token: string): Socket => {
  if (socket) {
    return socket;
  }

  socket = io(import.meta.env.VITE_SOCKET_URL, {
    autoConnect: false,
    auth: { token },
  });

  return socket;
};

/** Connects the shared socket if it isn't already connected. */
export const connectSocket = (token: string): Socket => {
  const instance = getSocket(token);

  if (!instance.connected) {
    instance.auth = { token };
    instance.connect();
  }

  return instance;
};

/** Disconnects and clears the shared socket (e.g. on logout). */
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
