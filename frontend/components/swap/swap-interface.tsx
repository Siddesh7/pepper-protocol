"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpDown, TrendingUp, Zap } from "lucide-react";
import { SwapQuote, Token } from "@/types/global";
import { useAccount } from "wagmi";
import { useWriteContract } from "wagmi";
import { PEPPER_LOCK_UNLOCK_BRIDGE_ABI } from "@/lib/pepper-lock-unlock-bridge.abi";

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

const PEPPER_LOCK_UNLOCK_BRIDGE_ADDRESS =
  "0x2d679dC3fF82E147C39fDC8E3221dbBad15d82BF";
const BASE_SEPOLIA_CHAIN_ID = 84532;
const CHILIZ_SPICY_CHAIN_ID = 88882;

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
  const [isSwapping, setIsSwapping] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const handleSwap = async () => {
    setIsSwapping(true);
    setError(null);
    setShowSuccess(false);
    console.log("handleSwap called");
    try {
      if (!fromToken || !fromAmount) throw new Error("Enter amount");
      console.log("Wallet address:", address);
      // Optionally, log network info if available
      // console.log("Network:", network);

      const destinationChainId = CHILIZ_SPICY_CHAIN_ID;
      const amount = BigInt(Math.floor(Number(fromAmount) * 1e18));

      console.log("Preparing to call writeContractAsync", {
        amount,
        destinationChainId,
        contract: PEPPER_LOCK_UNLOCK_BRIDGE_ADDRESS,
        abi: PEPPER_LOCK_UNLOCK_BRIDGE_ABI,
        chainId: BASE_SEPOLIA_CHAIN_ID,
      });

      // Add a timeout fallback in case the contract call hangs
      const contractPromise = writeContractAsync({
        address: PEPPER_LOCK_UNLOCK_BRIDGE_ADDRESS,
        abi: PEPPER_LOCK_UNLOCK_BRIDGE_ABI,
        functionName: "lock",
        args: [amount, destinationChainId],
        chainId: BASE_SEPOLIA_CHAIN_ID,
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Contract call timed out")), 20000)
      );

      const result = await Promise.race([contractPromise, timeoutPromise]);
      console.log("Contract call result:", result);

      setIsSwapping(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) {
      console.error("Swap error:", err);
      setIsSwapping(false);
      setError(err?.message || "Swap failed");
    }
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
          {/* From Token (fixed WETH) */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 rounded-2xl p-4 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-2">
              <img
                src={fromToken?.logoURI}
                alt={fromToken?.symbol}
                className="w-6 h-6 rounded-full"
              />
              <span className="font-semibold text-white">
                {fromToken?.symbol}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2 mt-2">
              <span className="text-sm text-white/70">From</span>
            </div>
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
          {/* To Token (fixed pWETH) */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 rounded-2xl p-4 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-2">
              <img
                src={toToken?.logoURI}
                alt={toToken?.symbol}
                className="w-6 h-6 rounded-full"
              />
              <span className="font-semibold text-white">
                {toToken?.symbol}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2 mt-2">
              <span className="text-sm text-white/70">To</span>
            </div>
            <input
              type="number"
              value={toAmount}
              readOnly
              placeholder="0.0"
              className="w-full bg-transparent text-2xl font-bold text-white placeholder-white/40 outline-none border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all [appearance:textfield] opacity-60 cursor-not-allowed"
              inputMode="decimal"
              step="any"
            />
          </motion.div>
        </div>
        {/* Fixed 1:1 Rate Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Rate</span>
            <span className="text-white flex items-center gap-1">
              1 {fromToken?.symbol} = 1 {toToken?.symbol}
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
        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-center">
            <span className="text-red-400 font-semibold">{error}</span>
          </div>
        )}
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
