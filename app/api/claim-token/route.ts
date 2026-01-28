import { NextRequest, NextResponse } from "next/server";
import { makeSTXTokenTransfer, broadcastTransaction } from "@stacks/transactions";
import { STACKS_TESTNET } from "@stacks/network";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

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

    const result = await broadcastTransaction({ transaction });

    return NextResponse.json(
      { txid: result.txid },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Transaction failed", details: error },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle preflight OPTIONS request
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}