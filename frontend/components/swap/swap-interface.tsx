"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpDown, TrendingUp, Zap } from "lucide-react";
import { TokenSelector } from "./token-selector";
import { SwapQuote, Token } from "@/types/global";

interface SwapInterfaceProps {
  fromToken: Token | null;
  setFromToken: (token: Token | null) => void;
  toToken: Token | null;
  setToToken: (token: Token | null) => void;
  fromAmount: string;
  setFromAmount: (amount: string) => void;
  toAmount: string;
  setToAmount: (amount: string) => void;
  quote: SwapQuote | null;
  isLoading: boolean;
}

const SwapInterface: React.FC<SwapInterfaceProps> = ({
  fromToken,
  setFromToken,
  toToken,
  setToToken,
  fromAmount,
  setFromAmount,
  toAmount,
  setToAmount,
  quote,
  isLoading,
}) => {
  // UI-specific state only
  const [isSwapping, setIsSwapping] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // UI-specific functions
  const flipTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = async () => {
    setIsSwapping(true);

    setTimeout(() => {
      setIsSwapping(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-md mx-auto"
    >
      <div className="z-40 backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            Swap
          </h2>
        </div>

        <div className="space-y-4">
          {/* From Token */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 rounded-2xl p-4 border border-white/10"
          >
            {/* Token Selector above input */}
            <TokenSelector
              selectedToken={fromToken}
              onTokenSelect={setFromToken}
            />
            {/* Balance below selector, above input */}
            <div className="flex justify-between items-center mb-2 mt-2">
              <span className="text-sm text-white/70">From</span>
              <span className="text-sm text-white/70">Balance: 1,250.45</span>
            </div>
            {/* Input below balance */}
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.0"
              className="w-full bg-transparent text-2xl font-bold text-white placeholder-white/40 outline-none border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all [appearance:textfield]"
              inputMode="decimal"
              step="any"
            />
          </motion.div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <motion.button
              onClick={flipTokens}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg"
            >
              <ArrowUpDown className="w-5 h-5" />
            </motion.button>
          </div>

          {/* To Token */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 rounded-2xl p-4 border border-white/10"
          >
            <TokenSelector selectedToken={toToken} onTokenSelect={setToToken} />
            <div className="flex justify-between items-center mb-2 mt-2">
              <span className="text-sm text-white/70">To</span>
              <span className="text-sm text-white/70">Balance: 89.12</span>
            </div>

            <input
              type="number"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              placeholder="0.0"
              className="w-full bg-transparent text-2xl font-bold text-white placeholder-white/40 outline-none border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all [appearance:textfield]"
              inputMode="decimal"
              step="any"
            />
          </motion.div>
        </div>

        {/* Price Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Rate</span>
            <span className="text-white flex items-center gap-1">
              1 {fromToken?.symbol} = 2.45 {toToken?.symbol}
              <TrendingUp className="w-4 h-4 text-green-400" />
            </span>
          </div>
        </motion.div>

        {/* Swap Button */}
        <motion.button
          onClick={handleSwap}
          disabled={isSwapping || !fromAmount}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 py-4 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl text-white font-bold text-lg shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
        >
          <AnimatePresence>
            {isSwapping ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Swapping...
              </motion.div>
            ) : (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                ⚡ Swap Tokens
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-center"
            >
              <span className="text-green-400 font-semibold">
                🎉 Swap Successful!
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SwapInterface;
