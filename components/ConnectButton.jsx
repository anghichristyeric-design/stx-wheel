import { AppContext } from "@/context/AppContext";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { isConnected } from "@stacks/connect";
import { useContext } from "react";

const ConnectButton = () => {
	const { connectWallet, disconnectWallet } = useWalletConnection();
  const walletIsConnected = isConnected();
  const { isLoading } = useContext(AppContext);

  return (
    walletIsConnected ? (
      <button onClick={disconnectWallet} className="btn w-44 py-3 bg-sky-700 cursor-pointer" disabled={isLoading}>Disconnect Wallet</button>
    ) : (
      <button onClick={connectWallet} className="btn w-44 py-3 bg-sky-700 cursor-pointer" disabled={isLoading}>Connect Wallet</button>
    )
  );
};

export default ConnectButton;