import React, { createContext, useContext, useState } from 'react';

interface User {
  userid: number;
  nome: string;
  email: string;
  senha: string;
}

interface AuthContextType {
  loggedUser: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  const login = (user: User) => {
    setLoggedUser(user);
  };

  const logout = () => {
    setLoggedUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};