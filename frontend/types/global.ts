export interface Token {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    logoURI: string;
    chainId: number;
}

export interface Chain {
    id: number;
    name: string;
    symbol: string;
    logoURI: string;
}

export interface SwapQuote {
    fromAmount: string;
    toAmount: string;
    rate: number;
    priceImpact: number;
    gas: string;
}