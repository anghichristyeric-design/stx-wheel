import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "STX Wheel of Fortune Faucet",
  description: "A gamified faucet to get STX testnet tokens!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppProvider>
        <body className={`${montserrat.className} antialiased`}>
          {children}

          <Toaster />
        </body>
      </AppProvider>
    </html>
  );
}
