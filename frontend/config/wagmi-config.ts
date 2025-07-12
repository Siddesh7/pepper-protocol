import { createConfig } from '@privy-io/wagmi';
import { http } from 'viem';
import { base, baseSepolia, chiliz, spicy } from 'viem/chains';

export const wagmiConfig = createConfig({
    chains: [base, baseSepolia, chiliz, spicy],
    transports: {
        [base.id]: http(),
        [baseSepolia.id]: http(),
        [chiliz.id]: http(),
        [spicy.id]: http(),
    },
});