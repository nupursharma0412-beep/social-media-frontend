import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    async function loadUser() {
      try {
        console.log("Calling getMe...");

        const data = await getMe();

        console.log("User from backend:", data);

        setUser(data.user);
      } catch (err) {
        console.log("getMe failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};