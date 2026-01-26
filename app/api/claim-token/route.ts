import { NextRequest } from "next/server";
import { makeSTXTokenTransfer, broadcastTransaction } from "@stacks/transactions";
import { STACKS_TESTNET } from "@stacks/network";

export async function POST(req: NextRequest) {
  const { amount, address } = await req.json();

  try {
    const transaction = await makeSTXTokenTransfer({
      recipient: address,
      amount: BigInt(Math.floor(amount * 1_000_000)),
      memo: "Claiming tokens from faucet",
      senderKey: process.env.FAUCET_PRIVATE_KEY || "",
      network: STACKS_TESTNET,
      fee: BigInt(400),
    });

    const result = await broadcastTransaction({transaction});

    return new Response(JSON.stringify({ txid: result.txid }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Transaction failed", details: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}