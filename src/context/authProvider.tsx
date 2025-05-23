import { createContext, useEffect, useState, ReactNode } from "react";
import { auth } from "../services/firebase"; // Ensure that this is using the new modular Firebase SDK
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  UserCredential,
  User,
} from "firebase/auth"; // Import types directly from firebase/auth

export interface AuthContextType {
  user: User; // Use User from firebase/auth
  isLoading: boolean;
  signInWithGoogle: () => Promise<UserCredential>; // Correctly reference UserCredential
  logout: () => Promise<void>;
}

// Create a default value for the context
export const AuthContext = createContext<AuthContextType | undefined | any>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Use User from firebase/auth
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function signInWithGoogle(): Promise<UserCredential> {
    // Specify return type
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function logout(): Promise<void> {
    // Specify return type
    return signOut(auth);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser as User); // Cast to User type
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
