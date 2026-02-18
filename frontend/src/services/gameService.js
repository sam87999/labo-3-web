import { api } from "./api";

export const gameService = {
  list: () => api.get("/listings").then((r) => r.data),
  get: (id) => api.get(`/listings/${id}`).then((r) => r.data),
  create: (payload) => api.post("/listings", payload).then((r) => r.data),
  update: (id, payload) => api.patch(`/listings/${id}`, payload).then((r) => r.data),
  remove: (id) => api.delete(`/listings/${id}`).then((r) => r.data),
};
