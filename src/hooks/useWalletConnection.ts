"use client"

import { useEffect, useState, useContext } from "react";
import { toast } from "../components/ui/use-toast";
import { AppContext } from "../context/AppContext";

export const useWalletConnection = () => {
  const { setIsConnected, setIsLoading } = useContext(AppContext);
  const [stacksConnect, setStacksConnect] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Dynamically import @stacks/connect only on client-side
    import("@stacks/connect").then((module) => {
      setStacksConnect(module);
    }).catch(err => {
      console.error("Failed to load @stacks/connect:", err);
    });
  }, []);

  const connectWallet = async () => {
    if (!stacksConnect) {
      toast({
        variant: "error",
        description: "Wallet library is still loading. Please try again.",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await stacksConnect.connect();
      console.log("Wallet connected successfully", response?.addresses?.[2].address);
    } catch (error) {
      toast({
        variant: "error",
        description:
          "Failed to connect wallet: " +
          (error instanceof Error ? error.message : String(error)),
      });
    } finally {
      const authenticated = stacksConnect.isConnected();
      setIsConnected(authenticated);
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    if (!stacksConnect) return;

    try {
      stacksConnect.disconnect();
      console.log("User disconnected successfully");
    } catch (error) {
      toast({
        variant: "error",
        description:
          "Failed to disconnect wallet: " +
          (error instanceof Error ? error.message : String(error)),
      });
    } finally {
      setIsConnected(false);
    }
  };

  const retrieveConnectionInfo = () => {
    if (typeof window === "undefined" || !stacksConnect) return false; // SSR guard
    
    const userData = stacksConnect.getLocalStorage();

    if (userData?.addresses) {
      return userData.addresses.stx[0].address;
    }

    return false;
  };

  return {
    connectWallet,
    disconnectWallet,
    retrieveConnectionInfo,
  };
};