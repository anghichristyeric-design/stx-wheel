"use client"

import { AppContext } from "../context/AppContext";
import { toast } from "../components/ui/use-toast"
import { useContext } from "react";
import { useWalletConnection } from "../hooks/useWalletConnection";

export const useClaimToken = () => {
  const {setIsLoading, setCoins} = useContext(AppContext)
  const { retrieveConnectionInfo } = useWalletConnection();
  
  const claimToken = async (amount: number) => {
    const connectedWalletAddress = retrieveConnectionInfo();
    
    if (connectedWalletAddress === false) {
      toast({
        variant: "error",
        description: "Please connect your wallet to collect rewards.",
      });
      return;
    }
    
    if (amount === 0) {
      toast({
        variant: "error",
        description: "No prize to collect!",
      });
      return;
    }

    setIsLoading(true);

    const res = await fetch("https://stx-testnet-faucet.vercel.app/api/claim-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, address: connectedWalletAddress }),
    });

    const data = await res.json();

    if (res.ok) {
      toast({
        variant: "success",
        description: "Faucet reward claimed successfully!",
        action: {
          url: `https://explorer.hiro.so/txid/${data.txid}?chain=testnet`,
          label: "View in explorer",
        },
      });

      console.log('Successfully claimed tokens with txid:', data.txid);
      setCoins(0);
    } else {
      toast({
        variant: "error",
        description: "Faucet reward claim failed: " + data.error,
      });
    }

    setIsLoading(false);
    return data;
  };

  return claimToken;
};