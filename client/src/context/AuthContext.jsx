/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(() => {
    const saved = localStorage.getItem("expense-user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  const setUser = useCallback((nextUser) => {
    setUserState(nextUser);
    if (nextUser) {
      localStorage.setItem("expense-user", JSON.stringify(nextUser));
    } else {
      localStorage.removeItem("expense-user");
    }
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await API.get("/auth/me");
      setUser(data.user);
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  useEffect(() => {
    Promise.resolve().then(fetchUser);
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
