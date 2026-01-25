"use client";
import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
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