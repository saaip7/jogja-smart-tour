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

  useEffect(() => {
    // Check authentication status when component mounts
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      console.log("Checking auth status...");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/status`,
        {
          withCredentials: true,
        }
      );

      console.log("Auth status response:", response.data);

      if (response.data.isAuthenticated && response.data.user) {
        console.log("User authenticated:", response.data.user);
        setUser(response.data.user);
        setLoading(false);
      } else {
        console.log("No user in response");
        setUser(null);
      }
    } catch (error) {
      console.log("Auth check error:", error);
      setUser(null);
    }
    // } finally {
    //   console.log("AuthContext state after check:", { user, loading });
    // }
  };

  const login = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`;
  };

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
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

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
