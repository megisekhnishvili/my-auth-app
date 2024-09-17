import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated when app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => setUser(response.data.user))
        .catch(() => localStorage.removeItem("token"));
    }
    setLoading(false);
  }, []);

  // Simulate login
  const login = async (credentials) => {
    try {
      const { data } = await axios.post("/api/auth/login", credentials);
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (error) {
      console.error("Failed to log in:", error);
    }
  };

  // Simulate logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, login, logout, loading };
};

export default useAuth;
