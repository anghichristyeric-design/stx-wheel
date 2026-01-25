import { toast } from "@/components/ui/use-toast";
import { AppContext } from "@/context/AppContext";
import { connect, disconnect, isConnected, getLocalStorage } from "@stacks/connect";
import { useContext } from "react";

export const useWalletConnection = () => {
  const { setIsConnected, setIsLoading } = useContext(AppContext)

  const connectWallet = async () => {
    try {
      const response = await connect();
      console.log("Wallet connected successfully", response);
      setIsLoading(true);
    } catch (error) {
      toast({
        variant: "error",
        description: "Failed to connect wallet: " + (error instanceof Error ? error.message : String(error)),
      });
    } finally {
      const authenticated = isConnected();
      setIsConnected(authenticated);
      setIsLoading(false);
      return;
    }
  };

  const disconnectWallet = () => {
    try {
      disconnect();
      console.log("User disconnected successfully");
    } catch (error) {
      toast({
        variant: "error",
        description: "Failed to disconnect wallet: " + (error instanceof Error ? error.message : String(error)),
      });
    } finally {
      setIsConnected(false);
      return;
    }
  };

  const retrieveConnectionInfo = () => {
    const userData = getLocalStorage();

    if (userData?.addresses) {
      return userData.addresses.stx[0].address;
    }

    return "No wallet connected";
  };

  return {
    connectWallet,
    disconnectWallet,
    retrieveConnectionInfo
  };
};