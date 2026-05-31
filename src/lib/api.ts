"use client";

import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("listingjet_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function setSession(token: string) {
  localStorage.setItem("listingjet_token", token);
}

export function clearSession() {
  localStorage.removeItem("listingjet_token");
}
