import React, { useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { Chain, Token } from "@/types/global";
import { chains, getTokensByChain } from "@/lib/tokens.utils";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { Button } from "../ui/button";

interface TokenSelectorProps {
  selectedToken: Token | null;
  onTokenSelect: (token: Token) => void;
  className?: string;
}

export const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedToken,
  onTokenSelect,
  className = "",
}) => {
  const [selectedChain, setSelectedChain] = useState<Chain>(chains[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const chainTokens = getTokensByChain(selectedChain.id);
  const filteredTokens = chainTokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTokenSelect = (token: Token, close: () => void) => {
    onTokenSelect(token);
    setSearchQuery("");
    close();
  };

  return (
    <div className={`relative ${className}`}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 px-1 py-3 rounded-full transition-all duration-200"
          >
            {selectedToken ? (
              <>
                <img
                  src={selectedToken.logoURI}
                  alt={selectedToken.symbol}
                  className="w-6 h-6 rounded-full"
                />
                <span className="font-semibold text-gray-900 dark:text-white">
                  {selectedToken.symbol}
                </span>
              </>
            ) : (
              <span className="font-semibold text-gray-500 dark:text-gray-400">
                Select Token
              </span>
            )}
            <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="p-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl w-full max-w-md">
          <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Select Token
            </h3>
            <AlertDialogCancel asChild>
              <button className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </AlertDialogCancel>
          </div>
          <div className="p-4">
            <div className="flex gap-2 mb-4">
              {chains.map((chain) => (
                <button
                  key={chain.id}
                  onClick={() => setSelectedChain(chain)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    selectedChain.id === chain.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <img
                    src={chain.logoURI}
                    alt={chain.name}
                    className="w-4 h-4 rounded-full"
                  />
                  <span className="text-sm font-medium">{chain.name}</span>
                </button>
              ))}
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>
            <div className="max-h-64 overflow-y-auto">
              {/* Use a render prop to close dialog on select */}
              <AlertDialogPrimitive.Cancel asChild>
                <div>
                  {filteredTokens.map((token) => (
                    <button
                      key={`${token.chainId}-${token.address}`}
                      onClick={(e) => {
                        // Find the closest dialog and close it
                        const dialog = e.currentTarget.closest(
                          '[data-slot="alert-dialog-content"]'
                        );
                        if (dialog) {
                          // Simulate clicking the cancel button to close
                          const cancelBtn = dialog.querySelector(
                            '[data-slot="alert-dialog-cancel"]'
                          );
                          if (cancelBtn) (cancelBtn as HTMLElement).click();
                        }
                        handleTokenSelect(token, () => {});
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      <img
                        src={token.logoURI}
                        alt={token.symbol}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {token.symbol}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {token.name}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </AlertDialogPrimitive.Cancel>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
