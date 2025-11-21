import { create } from "zustand";

type TokenStore = {
  token: string;
  setToken: (value: string) => void;
};

export const useTokenStore = create<TokenStore>((set) => ({
  token: "",
  setToken: (value: string) => set({ token: value }),
}));
