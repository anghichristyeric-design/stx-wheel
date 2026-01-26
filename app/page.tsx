"use client";

import dynamic from 'next/dynamic';

// Import the client component with no SSR
const ClientWrapper = dynamic(() => import('./ClientWrapper'), {
  ssr: false,
  loading: () => (
    <main className="flex flex-col h-screen items-center justify-center bg-zinc-50 font-sans">
      <h1 className="font-bold text-4xl mb-8">STX Wheel of Fortune</h1>
      <div className="text-center">Loading...</div>
    </main>
  ),
});

export default function Home() {
  return <ClientWrapper />;
}