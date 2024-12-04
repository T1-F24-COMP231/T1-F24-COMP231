import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  isAdmin: boolean;
  login: (token: string, isAdmin: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));
  const [isAdmin, setIsAdmin] = useState<boolean>(
    JSON.parse(localStorage.getItem("isAdmin") || "false")
  );

  const login = (authToken: string, isAdminFlag: boolean) => {
    setToken(authToken);
    setIsAdmin(isAdminFlag);
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("isAdmin", JSON.stringify(isAdminFlag));
  };

  const logout = () => {
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAdmin");
  };

  return (
    <AuthContext.Provider value={{ token, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
