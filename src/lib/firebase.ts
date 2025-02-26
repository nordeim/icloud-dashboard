import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { 
  getAuth, 
  signInWithCredential, 
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  type User
} from 'firebase/auth';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let db;
let isInitialized = false;
let auth;
let currentUser: User | null = null;

try {
  // Initialize Firebase only if it hasn't been initialized already
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  
  // Initialize Firestore
  db = getFirestore(app);
  auth = getAuth(app);
  
  // Set auth persistence
  setPersistence(auth, browserLocalPersistence);
  
  // Enable offline persistence
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code !== 'failed-precondition') {
      console.warn('Firebase persistence error:', err);
    }
  });
  
  // Initialize auth state listener
  if (auth) {
    onAuthStateChanged(auth, (user) => {
      currentUser = user;
      console.log('Auth state changed:', user?.email);
    });
  }
  
  isInitialized = true;
} catch (error) {
  console.error("Error initializing Firebase:", error);
  // Consider a more sophisticated error handling strategy here, perhaps throwing an error to halt the application or displaying a user-friendly message.
  isInitialized = false;
}

if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  console.warn(
    'Firebase configuration is missing. Please add the required environment variables.'
  );
  isInitialized = false;
}

// Update sync function with better error handling
const syncFirebaseAuth = async (token: string) => {
  if (!auth) {
    console.error('Firebase auth not initialized');
    return;
  }
  
  if (!currentUser && token) {
    try {
      const credential = GoogleAuthProvider.credential(null, token);
      await signInWithCredential(auth, credential);
    } catch (error) {
      console.error("Error signing in with credential:", error);
    }
  }
};

export { db, auth, isInitialized, syncFirebaseAuth, currentUser };
