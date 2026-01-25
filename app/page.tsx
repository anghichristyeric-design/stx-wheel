"use client";
import { useContext, useState } from "react";
import { Wheel } from "react-custom-roulette";
import ConnectButton from "@/components/ConnectButton";
import { useClaimToken } from "@/hooks/useClaimToken";
import { AppContext } from "@/context/AppContext";

const data = [
  { option: "0 STX" },
  { option: "5 STX" },
  { option: "10 STX" },
  { option: "20 STX" },
  { option: "30 STX" },
  { option: "40 STX" },
  { option: "0 STX" },
  { option: "5 STX" },
  { option: "10 STX" },
  { option: "20 STX" },
  { option: "30 STX" },
  { option: "40 STX" },
];

export default function Home() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const claimToken = useClaimToken();
  const {isLoading, coins, setCoins} = useContext(AppContext)

  // Handle Spin Click
  const handleSpinClick = async () => {
    if (mustSpin) return; // Prevent spin if already spinning

    // Start spinning the wheel
    setMustSpin(true);

    // Set a random prize number after the wheel starts spinning
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
  };

  // Handle when the spinning stops
  const handleStopSpinning = () => {
    // Reward calculation logic based on prizeNumber
    let prizeAmount = 0;
    switch (data[prizeNumber].option) {
      case "0 STX":
        prizeAmount = 0;
        break;
      case "5 STX":
        prizeAmount = 5;
        break;
      case "10 STX":
        prizeAmount = 10;
        break;
      case "20 STX":
        prizeAmount = 20;
        break;
      case "30 STX":
        prizeAmount = 30;
        break;
      case "40 STX":
        prizeAmount = 40;
        break;
      default:
        prizeAmount = 0;
    }
    setCoins(prizeAmount + coins); // Update prize amount
    setMustSpin(false); // Stop the spinning animation
  };
  
  return (
    <main className="flex flex-col h-screen items-center justify-center bg-zinc-50 font-sans">
      <h1 className="font-bold text-4xl mb-8">STX Wheel of Fortune</h1>

      <section className="flex flex-col items-center justify-center space-y-6">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={handleStopSpinning}
          backgroundColors={['#ffcc00', '#ff9900', '#ff5722', '#e64a19']}
          textColors={['#ffffff']}
          outerBorderColor="#ff5722"
          outerBorderWidth={10}
          innerBorderColor="#000000"
          innerBorderWidth={5}
          innerRadius={10}
          radiusLineColor="#ffffff"
          radiusLineWidth={5}
        />
        
        <button className="btn w-sm py-4 bg-amber-600" onClick={handleSpinClick} disabled={mustSpin === true}>
          SPIN
        </button>
      </section>

      
      <section className="space-y-4 mt-8 text-center">
        <div className="flex items-center justify-center gap-x-4 w-2xl">
          <button className="btn w-44 py-3 bg-purple-600" onClick={async () => await claimToken(coins)} disabled={coins === 0 || isLoading}>
            Collect Reward
          </button>
          
          <ConnectButton />
        </div>

        {coins > 0 && <p className="win-message">🎉 You won {coins} STX! 🎉</p>}
      </section>
    </main>
  );
}
