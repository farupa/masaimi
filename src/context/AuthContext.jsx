import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Mock accounts — replace with real JWT login once backend exists
const mockMember = {
  id: "M-1042",
  role: "member",
  name: "Rafiqul Islam",
  bank: "Dutch-Bangla Bank",
  nid: "1990-4471-XXXX",
  status: "approved", // pending | approved | rejected
};

const mockAdmin = {
  id: "A-01",
  role: "admin",
  name: "Committee Admin",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const loginAsMember = () => setUser(mockMember);
  const loginAsAdmin = () => setUser(mockAdmin);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loginAsMember, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}