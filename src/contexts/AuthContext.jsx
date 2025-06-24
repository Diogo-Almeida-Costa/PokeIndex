import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para cadastrar usuário
  async function signup(email, password, username) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Salvar dados adicionais do usuário no Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        username: username,
        email: email,
        createdAt: new Date().toISOString()
      });
      
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Função para fazer login
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Função para fazer logout
  function logout() {
    return signOut(auth);
  }

  // Função para obter dados do usuário do Firestore
  async function getUserData(uid) {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      return null;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Buscar dados adicionais do usuário
        const userData = await getUserData(user.uid);
        setCurrentUser({
          ...user,
          username: userData?.username || ''
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    getUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

