"use client"
import React, { ReactNode } from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { base } from 'viem/chains';
import { WagmiProvider } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from '@/config/wagmi-config';

const Providers = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient();

    return (
        <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || 'cmd058jc1024ckz0n98ka7tlb'}
            clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID}
            config={{
                appearance: {
                    "accentColor": "#6A6FF5",
                    "theme": "#FFFFFF",
                    "showWalletLoginFirst": false,
                    "logo": "https://auth.privy.io/logos/privy-logo.png",
                    "walletChainType": "ethereum-and-solana",
                    "walletList": [
                        "detected_wallets",
                        "metamask",
                        "phantom"
                    ]
                },
                embeddedWallets: {
                    ethereum: {
                        createOnLogin: 'users-without-wallets'
                    }
                },
                defaultChain: base,
                loginMethods: ["email", "google", "wallet"]
            }}
        >
            <QueryClientProvider client={queryClient}>
                <WagmiProvider config={wagmiConfig}>
                    {children}
                </WagmiProvider>
            </QueryClientProvider>
        </PrivyProvider>
    );
};

export default Providers;