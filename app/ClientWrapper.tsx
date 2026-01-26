"use client";

import { useContext, useState } from "react";
import ConnectButton from "@/components/ConnectButton";
import { useClaimToken } from "@/hooks/useClaimToken";
import { AppContext } from "@/context/AppContext";

import dynamic from "next/dynamic";
const Wheel = dynamic( () => import("react-custom-roulette").then((mod) => mod.Wheel), { ssr: false } );

const data = [
  { option: "0 STX", style: { backgroundColor: 'green', textColor: 'white' } },
  { option: "5 STX" },
  { option: "10 STX" },
  { option: "20 STX" },
  { option: "30 STX" },
  { option: "40 STX" },
  { option: "50 STX" },
  { option: "5 STX" },
  { option: "10 STX" },
  { option: "20 STX" },
  { option: "30 STX" },
  { option: "40 STX" },
  { option: "50 STX" },
];

export default function ClientWrapper() {
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
    let prizeAmount = Number((data[prizeNumber].option).replace(" STX", ""));
		
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
          backgroundColors={['#222222', 'darkred']}
          textColors={['#ffffff']}
          outerBorderColor="#333"
          outerBorderWidth={10}
          innerBorderColor="#333"
          innerBorderWidth={5}
          innerRadius={10}
          radiusLineColor="yellow"
          radiusLineWidth={3}
        />
        
        <button className="btn w-sm py-4 bg-amber-600" onClick={handleSpinClick} disabled={mustSpin === true}>
          SPIN
        </button>
      </section>

      <section className="space-y-4 mt-8 text-center">
        <div className="flex items-center justify-center gap-x-4 w-2xl">
          <button className="btn w-44 py-3 bg-purple-600"onClick={async () => await claimToken(coins)} disabled={!coins || isLoading}>
            Collect Reward
          </button>
          
          <ConnectButton />
        </div>

        <div className="h-8">
          {coins > 0 && <span>🎉 You won {coins} STX! 🎉</span>}
        </div>
      </section>
    </main>
  );
}