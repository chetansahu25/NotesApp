import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  // Registering user
  const createUser = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        {
          organisationId: "68d80725cd9688f7d33fc1ac",    
          name: formData.name,
          role: formData.role,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      // Save tokens and user in localStorage
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Updating the state of user and isAuthenticated
      setUser(response.data.user);
      setIsAuthenticated(true);
      console.log(user, isAuthenticated);

      return response;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error; 
    }
  };

  // User Login function
  const login = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setUser(response.data.user);
      setIsAuthenticated(true);

      return response;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  // User Logout function
  const logout = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {}, { withCredentials: true });

      if (response.data) {
        console.log(response.data.message);
        localStorage.clear();
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const value = { user, isAuthenticated, createUser, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export default AuthProvider;