import { createConfig } from "@privy-io/wagmi";
import { http } from "viem";
import { base, baseSepolia, chiliz, spicy } from "viem/chains";

export const wagmiConfig = createConfig({
  chains: [baseSepolia, spicy],
  transports: {
    [baseSepolia.id]: http(),
    [spicy.id]: http(),
  },
});
