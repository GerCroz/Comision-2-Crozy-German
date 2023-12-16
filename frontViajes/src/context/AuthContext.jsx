import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../utils/consts";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const signin = ({ token, user }) => {
    try {
      setAuth(user);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error)
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuth(null);
    setIsAuthenticated(false);
    setLoading(true)
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");


      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setAuth(null);
      }

      try {
        const res = await fetch(`${API_URL}/verify/${token}`, {
          method: "GET",
        });

        const data = await res.json();

        if (!data) {
          setIsAuthenticated(false);
          setAuth(null);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setAuth(data.user);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setAuth(null);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        signin,
        isAuthenticated,
        setLoading,
        loading,
        setAuth,
        setIsAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};