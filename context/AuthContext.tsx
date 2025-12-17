"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Définition de l'utilisateur (doit correspondre à votre Java User.java)
interface User {
  id: number;
  fullName: string;
  email: string;
  role: "USER" | "ADMIN" | "AGENCY" | "DRIVER";
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  protect: (path: string) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Au chargement de l'app, on vérifie si l'utilisateur est déjà connecté
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // --- FONCTION DE CONNEXION ET REDIRECTION ---
  const login = (userData: User) => {
    // 1. On sauvegarde l'utilisateur
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    // 2. AIGUILLAGE SELON LE RÔLE
    // C'est ici que tout se décide !
    if (userData.role === "AGENCY") {
      router.push("/Dashboard/Agency"); // Agence -> Son tableau de bord
    } else if (userData.role === "DRIVER") {
      router.push("/Dashboard/Driver"); // Chauffeur -> Son tableau de bord
    } else {
      router.push("/"); // Client classique -> Accueil
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/Login");
  };

  const protect = (path: string) => {
    if (!user) {
      router.push("/Login");
    } else {
      router.push(path);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, protect, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);