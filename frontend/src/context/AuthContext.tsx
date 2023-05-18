import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: undefined as any,
  isLoading: false,
  setUser: (user: any) => {},
});

export const useAuthContext = () => useContext(AuthContext);