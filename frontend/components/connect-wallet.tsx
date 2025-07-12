"use client";

import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAccount } from 'wagmi';
import { centerMaskWalletAddress } from '@/lib/utils';
import { Copy, LogOut } from 'lucide-react';

const ConnectWallet = () => {

    const { ready, authenticated, user, logout, login } = usePrivy();

    const disableLogin = !ready || (ready && authenticated);

    console.log("user", user);

    const { address } = useAccount();
    console.log("address", address);

    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
        if (address) {
            try {
                await navigator.clipboard.writeText(address);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            } catch (err) {
                alert('Failed to copy address');
            }
        }
    };

    if (!authenticated) return (
        <Button
            disabled={disableLogin}
            onClick={() => login()}
        >
            Log in
        </Button>
    )

    return (
        <>
            {address && <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">{centerMaskWalletAddress(address, 6)}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="gap-5" align="start">
                    <DropdownMenuItem className='h-10' onSelect={handleCopy}> <Copy /> Copy Address</DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className='h-10'>
                        <LogOut color='red' />
                        <span className='text-red-500'>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>}


        </>
    );
};

export default ConnectWallet;