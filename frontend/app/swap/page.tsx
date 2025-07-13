"use client";
import FloatingClubs from "@/components/swap/floating-clubs";
import StadiumBackground from "@/components/swap/stadium-background";
import SwapInterface from "@/components/swap/swap-interface";
import React, { useState, useEffect } from "react";
import { Token } from "@/types/global";
import { tokens } from "@/lib/tokens.utils";

const WETH_BASE = tokens.find(
  (t) => t.symbol === "WETH" && t.chainId === 84532
);
const PWETH_CHILIZ = tokens.find(
  (t) => t.symbol === "pWETH" && t.chainId === 88882
);

const SwapPage = () => {
  // Only allow WETH -> pWETH
  const [fromToken] = useState<Token | null>(WETH_BASE || null);
  const [toToken] = useState<Token | null>(PWETH_CHILIZ || null);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  useEffect(() => {
    setToAmount(fromAmount); // 1:1 peg
  }, [fromAmount]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-900 via-blue-900 to-purple-900">
      <StadiumBackground />
      <FloatingClubs onClubSelect={() => {}} />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold font-inter  mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Swap
          </h1>
          <p className="text-xl text-white/80 font-medium">
            Trade Fan Tokens Like a Champion
          </p>
        </div>
        <SwapInterface
          fromToken={fromToken}
          setFromToken={() => {}}
          toToken={toToken}
          setToToken={() => {}}
          fromAmount={fromAmount}
          setFromAmount={setFromAmount}
          toAmount={toAmount}
          setToAmount={setToAmount}
          quote={null}
          isLoading={false}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
};

export default SwapPage;
