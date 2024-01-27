// Initialize Firebase
import { initializeApp } from "firebase/app";
import { initializeAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { DataProviderResources, UserRole } from "../../abstracts/enums";
import { firebaseConfig } from "./config";

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = initializeAuth(firebaseApp);

export const firebaseFireStore = getFirestore(firebaseApp);

export const writeNewUserRole = async (uid: string, role: UserRole) => {
  const email = process.env.REACT_APP_FIREBASE_ADMIN_EMAIL;
  const password = process.env.REACT_APP_FIREBASE_ADMIN_PASSWORD;

  await signInWithEmailAndPassword(firebaseAuth, email, password);

  await setDoc(doc(firebaseFireStore, DataProviderResources.USERS, uid), {
    role
  });

  await signOut(firebaseAuth);
};