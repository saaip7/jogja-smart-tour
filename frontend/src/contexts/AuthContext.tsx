"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "../hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  googleId: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: async () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/status`,
        {
          withCredentials: true,
        }
      );
      
      if (response.data.isAuthenticated && response.data.user) {
        setUser(response.data.user);
        // Don't show a toast here as it might be annoying on initial load
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("Auth check error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    toast({
      title: "Proses Login",
      description: "Mengarahkan ke halaman login Google...",
      variant: "default",
    });
    
    // Redirect to Google OAuth login
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`;
  };

  const logout = async () => {
    try {
      toast({
        title: "Logout",
        description: "Sedang memproses logout...",
        variant: "default",
      });
      
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      
      setUser(null);
      
      toast({
        title: "Berhasil Logout",
        description: "Anda telah berhasil keluar dari akun",
        variant: "success",
      });
      
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      
      toast({
        title: "Gagal Logout",
        description: "Terjadi kesalahan saat proses logout. Silakan coba lagi.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);