// src/context/AuthContext.tsx
import { createContext, useState, useContext, ReactNode } from "react";
import * as authApi from "../api/auth";

interface User {
  id: number;
  username: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const loggedUser = await authApi.login(username, password);
      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));
    } catch (err) {
      throw err;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    const newUser = await authApi.register(username, email, password);
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}