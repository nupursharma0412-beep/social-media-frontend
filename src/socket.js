import { io } from "socket.io-client";

const socketUrl = import.meta.env.VITE_API_URL || "/";

export const socket = io(socketUrl, {
  autoConnect: false,
  withCredentials: true,
});
