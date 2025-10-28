import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const register = async (email, password) => {
  try {
    console.log("🔍 Attempting user registration for:", email);

    if (!auth) {
      throw new Error("Firebase auth is not initialized");
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("✅ User registration successful:", {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    });

    return userCredential.user;
  } catch (error) {
    console.error("❌ Registration error:", {
      code: error.code,
      message: error.message,
      email: email,
    });
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    console.log("🔍 Attempting email/password login for:", email);
    console.log("🔍 Auth object available:", !!auth);
    console.log("🔍 Current domain:", window.location.host);

    if (!auth) {
      throw new Error("Firebase auth is not initialized");
    }

    console.log("🔍 Calling signInWithEmailAndPassword...");
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("✅ Email/password login successful:", {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    });

    return userCredential.user;
  } catch (error) {
    console.error("❌ Login error:", {
      code: error.code,
      message: error.message,
      email: email,
      stack: error.stack,
    });
    throw error;
  }
};

export const logout = async () => {
  try {
    console.log("🔍 Attempting user logout");

    if (!auth) {
      throw new Error("Firebase auth is not initialized");
    }

    await signOut(auth);
    console.log("✅ User logout successful");
  } catch (error) {
    console.error("❌ Logout error:", {
      code: error.code,
      message: error.message,
    });
    throw error;
  }
};
