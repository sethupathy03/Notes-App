import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEowASvDWlHjCGEmKa_P6o29SxwKG2Pwo",
  authDomain: "login-5721e.firebaseapp.com",
  projectId: "login-5721e",
  storageBucket: "login-5721e.firebasestorage.app",
  messagingSenderId: "479494937109",
  appId: "1:479494937109:web:5f050afa1cdbb65195cc1c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);