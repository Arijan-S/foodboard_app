import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider: Setting up auth state listener");

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        console.log("AuthProvider: Auth state changed", {
          user: user ? user.email : null,
        });
        setUser(user);
        setLoading(false);
      },
      (error) => {
        console.error("AuthProvider: Auth state change error:", error);
        setUser(null);
        setLoading(false);
      }
    );

    return () => {
      console.log("AuthProvider: Cleaning up auth state listener");
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
  };

  console.log("AuthProvider: Current state", {
    user: user ? user.email : null,
    loading,
    isAuthenticated: !!user,
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
