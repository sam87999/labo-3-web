import { api } from "./api";

export const authService = {
  register: (name, email, password) =>
    api.post("/auth/register", { name, email, password }).then((r) => r.data),

  login: (email, password) =>
    api.post("/auth/login", { email, password }).then((r) => r.data),

  profile: () => api.get("/auth/profile").then((r) => r.data),
};