"use client";
import FloatingClubs from "@/components/swap/floating-clubs";
import StadiumBackground from "@/components/swap/stadium-background";
import SwapInterface from "@/components/swap/swap-interface";
import React, { useState, useEffect, useCallback } from "react";
import { Token, SwapQuote } from "@/types/global";
import { tokens } from "@/lib/tokens.utils";

const SwapPage = () => {
  // Main state management
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [quote, setQuote] = useState<SwapQuote | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle club selection from floating clubs - memoized to prevent re-renders
  const handleClubSelect = useCallback((clubSymbol: string) => {
    const selectedToken = tokens.find((token) => token.symbol === clubSymbol);
    if (selectedToken) {
      setToToken(selectedToken);
    }
  }, []);

  // Core business logic functions
  const fetchQuote = async () => {
    if (!fromToken || !toToken || !fromAmount || parseFloat(fromAmount) <= 0) {
      setToAmount("");
      setQuote(null);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock quote calculation
    const rate = Math.random() * 2000 + 100;
    const calculatedToAmount = (parseFloat(fromAmount) * rate).toFixed(6);
    const mockQuote = {
      fromAmount,
      toAmount: calculatedToAmount,
      rate,
      priceImpact: Math.random() * 2,
      gas: (Math.random() * 50 + 10).toFixed(2),
    };

    setQuote(mockQuote);
    setToAmount(calculatedToAmount);
    setIsLoading(false);
  };

  // Effect for quote fetching
  useEffect(() => {
    const timeoutId = setTimeout(fetchQuote, 500);
    return () => clearTimeout(timeoutId);
  }, [fromToken, toToken, fromAmount]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-900 via-blue-900 to-purple-900">
      <StadiumBackground />
      <FloatingClubs onClubSelect={handleClubSelect} />

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
          setFromToken={setFromToken}
          toToken={toToken}
          setToToken={setToToken}
          fromAmount={fromAmount}
          setFromAmount={setFromAmount}
          toAmount={toAmount}
          setToAmount={setToAmount}
          quote={quote}
          isLoading={isLoading}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
};

export default SwapPage;
