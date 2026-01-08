import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  token: null,
  error: null,

  setUser: (user) => set({
    user,
    isAuthenticated: !!user,
  }),

  setToken: (token) => set({ token }),

  logout: () => set({
    user: null,
    isAuthenticated: false,
    token: null,
  }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),
}));

export const useUrlStore = create((set, get) => ({
  urls: [],
  isLoading: false,
  error: null,
  lastUpdated: null,

  setUrls: (urls) => set({
    urls,
    lastUpdated: new Date().toISOString(),
  }),

  addUrl: (url) => set((state) => ({
    urls: [url, ...state.urls],
  })),

  updateUrl: (code, updates) => set((state) => ({
    urls: state.urls.map((url) =>
      url.code === code ? { ...url, ...updates } : url
    ),
  })),

  deleteUrl: (code) => set((state) => ({
    urls: state.urls.filter(url => url.code !== code),
  })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  clear: () => set({
    urls: [],
    isLoading: false,
    error: null,
    lastUpdated: null,
  }),
}));
