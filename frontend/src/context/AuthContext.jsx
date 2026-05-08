import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  const register = async (name, email, password) => {
    const { data } = await api.post("/api/auth/register", {
      name,
      email,
      password,
    });
    setUser({ id: data._id, name: data.name, email: data.email });
    localStorage.setItem(
      "user",
      JSON.stringify({ id: data._id, name: data.name, email: data.email }),
    );
  };

  const login = async (email, password) => {
    const { data } = await api.post("/api/auth/login", { email, password });
    setUser({ id: data._id, name: data.name, email: data.email });
    localStorage.setItem(
      "user",
      JSON.stringify({ id: data._id, name: data.name, email: data.email }),
    );
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
