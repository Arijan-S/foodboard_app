import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    console.log("🔍 Starting Google sign-in process...");

    // Check if auth is properly initialized
    if (!auth) {
      throw new Error("Firebase auth is not initialized");
    }

    const provider = new GoogleAuthProvider();
    // Add additional scopes if needed
    provider.addScope("email");
    provider.addScope("profile");

    // Set custom parameters for better UX
    provider.setCustomParameters({
      prompt: "select_account",
    });

    console.log("🔍 Attempting signInWithPopup...");
    const result = await signInWithPopup(auth, provider);

    console.log("✅ Google sign-in successful:", {
      uid: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName,
    });

    return result.user;
  } catch (error) {
    console.error("❌ Google sign-in error:", {
      code: error.code,
      message: error.message,
      stack: error.stack,
    });
    throw error;
  }
};
