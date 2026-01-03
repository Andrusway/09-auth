"use client";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";
import { useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuth((state) => state.setUser);
  const clearUser = useAuth((state) => state.clearIsAuthenticated);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const isAuthenticated = await checkSession();
        if (isAuthenticated) {
          const user = await getMe();
          if (user) {
            setUser(user);
          }
        } else {
          clearUser();
        }
      } catch (error) {
        console.error("Auth check failed", error);
        clearUser();
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [setUser, clearUser]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
}
