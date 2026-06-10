import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register } from "../services/auth.api";

export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);

  const handleLogin = async (username, password) => {
    try {
      setLoading(true);

      const response = await login(username, password);
      setUser(response.user);

      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed";
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    try {
      setLoading(true);

      const response = await register(username, email, password);
      setUser(response.user);

      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Register failed";
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
  };
};