import { async } from "@firebase/util";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

import { db } from "../firebase/config";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // Cleanup - Deal with memory leak
  const [cancelled, setCancelled] = useState(null);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);

    setError(null);

    try {
      const { user } = createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);

      return user;
    } catch (error) {
      let errorMsg;

      if (error.message.includes("Password")) {
        errorMsg = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        errorMsg = "E-mail já cadastrado.";
      } else {
        errorMsg = "Ocorreu um erro. Por favor tente mais tarde.";
      }

      setLoading(false);
      setError(errorMsg);
    }
  };

  // login - sign in
  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let errorMsg;

      if (error.message.includes("user-not-found")) {
        errorMsg = "Usuário não encontrado.";
      } else if (error.message.includes("wrong-password")) {
        errorMsg = "Senha incorreta.";
      } else {
        errorMsg = "Ocorreu um erro. Por favor tente mais tarde.";
      }

      setLoading(false);
      setError(errorMsg);
    }
  };

  // logout - sign out
  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    login,
    logout,
  };
};
