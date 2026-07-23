import { createContext, useContext, useState, useEffect } from "react";
import API from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load, restore user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("masaimi_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (phone, password) => {
    const res = await API.post("/auth/login", { phone, password });
    localStorage.setItem("masaimi_token", res.data.token);
    localStorage.setItem("masaimi_user", JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res.data.user;
  };

  const register = async (formData) => {
    const res = await API.post("/auth/register", formData);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("masaimi_token");
    localStorage.removeItem("masaimi_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}