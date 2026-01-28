
import { createContext, useState, type ReactNode } from "react";

const AppContext = createContext({
  isConnected: false,
  setIsConnected: (_value: boolean) => {},
  isLoading: false,
  setIsLoading: (_value: boolean) => {},
  coins: 0,
  setCoins: (_value: number) => {},
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coins, setCoins] = useState(0);

  return (
    <AppContext.Provider
      value={{
        isConnected,
        setIsConnected,
        isLoading,
        setIsLoading,
        coins,
        setCoins,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };