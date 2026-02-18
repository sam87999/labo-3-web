import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authservice";

function extractToken(data) {
  return (
    data?.token ||
    data?.accessToken ||
    data?.jwt ||
    data?.data?.token ||
    data?.data?.accessToken
  );
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
        setUser(null);
        setLoading(false);
        return;
    }
        const data = await authService.profile();
        setUser(data.user);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function register(name, email, password) {
  const data = await authService.register(name, email, password);

  const token = extractToken(data);
  if (token) localStorage.setItem("token", token);
  else console.warn("Aucun token trouvé dans la réponse register:", data);

  setUser(data.user || data.data?.user || null);
}
  async function login(email, password) {
  const data = await authService.login(email, password);

  const token = extractToken(data);
  if (token) localStorage.setItem("token", token);
  else console.warn("Aucun token trouvé dans la réponse login:", data);

  setUser(data.user || data.data?.user || null);
}

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}