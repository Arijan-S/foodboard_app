import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyCrjzaZ_5FTXu1ebywZ_Sex2JdQdejxgPI",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "fir-project-a1973.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fir-project-a1973",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "fir-project-a1973.appspot.com",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "842672513789",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:842672513789:web:e1b5c475de3c4d02ac1494",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-N3211QM678",
  databaseURL:
    import.meta.env.VITE_FIREBASE_DATABASE_URL ||
    "https://fir-project-a1973-default-rtdb.firebaseio.com",
};

// Initialize Firebase
let app;
let auth;
let database;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  database = getDatabase(app);

  console.log("✅ Firebase initialized successfully with config:", {
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    databaseURL: firebaseConfig.databaseURL,
  });
} catch (error) {
  console.error("❌ Firebase initialization failed:", error);
  throw new Error(`Firebase initialization failed: ${error.message}`);
}

// Test database connection
export const testDatabaseConnection = async () => {
  try {
    const { ref, get } = await import("firebase/database");
    // Test with a simple read to foodMenus instead of .info/connected
    const testRef = ref(database, "foodMenus");
    const snapshot = await get(testRef);
    console.log("✅ Database connection test: Connected");
    return true; // If we can read, we're connected
  } catch (error) {
    console.error("❌ Database connection test failed:", error);
    return false;
  }
};

// Test database write permissions
export const testDatabaseWritePermissions = async (user) => {
  try {
    if (!user || !user.uid) {
      throw new Error("User not authenticated");
    }

    const { ref, set, remove } = await import("firebase/database");
    const testRef = ref(database, `test/${user.uid}`);

    // Try to write a test value
    await set(testRef, {
      test: true,
      timestamp: new Date().toISOString(),
      uid: user.uid,
    });

    console.log("✅ Database write permissions test: Success");

    // Clean up test data
    await remove(testRef);

    return true;
  } catch (error) {
    console.error("❌ Database write permissions test failed:", error);
    return false;
  }
};

// Export Firebase services
export { auth, database };
export default app;
