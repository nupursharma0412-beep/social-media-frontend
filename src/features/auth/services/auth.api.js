import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
export default api;
export async function login(username, password) {
  const response = await api.post("/auth/login", {
    username,
    password,
  });
  return response.data;
}

export async function register(username, email, password) {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
  });
  return response.data;
}

export async function getMe() {
  const response = await api.get("/auth/get-me");
  return response.data;
}