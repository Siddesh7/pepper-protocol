import { Chain, Token } from "@/types/global";

export const chains: Chain[] = [
    {
        id: 1,
        name: 'Ethereum',
        symbol: 'ETH',
        logoURI: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png'
    },
    {
        id: 8453,
        name: 'Base',
        symbol: 'BASE',
        logoURI: 'https://assets.coingecko.com/coins/images/55602/standard/Ticker_COIN__Company_Name_Coinbase__size_200x200_2x.png?1746858187'
    },
    {
        id: 88888,
        name: 'Chiliz',
        symbol: 'CHZ',
        logoURI: 'https://assets.coingecko.com/coins/images/8834/thumb/Chiliz.png'
    }
];

export const tokens: Token[] = [
    // Ethereum tokens
    {
        address: '0x0000000000000000000000000000000000000000',
        symbol: 'ETH',
        name: 'Ethereum',
        decimals: 18,
        logoURI: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png',
        chainId: 1
    },
    {
        address: '0xA0b86a33E6Fa6c7C2E57ABDA8D2A0B4A6A79D1f1',
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
        logoURI: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png',
        chainId: 1
    },
    {
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        symbol: 'USDT',
        name: 'Tether USD',
        decimals: 6,
        logoURI: 'https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png',
        chainId: 1
    },
    {
        address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        symbol: 'WBTC',
        name: 'Wrapped Bitcoin',
        decimals: 8,
        logoURI: 'https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png',
        chainId: 1
    },

    // Base tokens
    {
        address: '0x0000000000000000000000000000000000000000',
        symbol: 'ETH',
        name: 'Ethereum',
        decimals: 18,
        logoURI: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png',
        chainId: 8453
    },
    {
        address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
        logoURI: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png',
        chainId: 8453
    },
    {
        address: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
        symbol: 'DAI',
        name: 'Dai Stablecoin',
        decimals: 18,
        logoURI: 'https://assets.coingecko.com/coins/images/9956/thumb/4943.png',
        chainId: 8453
    },

    // Chiliz tokens
    {
        address: '0x0000000000000000000000000000000000000000',
        symbol: 'CHZ',
        name: 'Chiliz',
        decimals: 18,
        logoURI: 'https://assets.coingecko.com/coins/images/8834/thumb/Chiliz.png',
        chainId: 88888
    },
    {
        address: '0xc2661815C69c2B3924D3dd0c2C1358A1E38A3105',
        symbol: 'PSG',
        name: 'Paris Saint-Germain Fan Token',
        decimals: 0,
        logoURI: '/fanTokens/psg_token.png',
        chainId: 88888
    },
    {
        address: '0xFD3C73b3B09D418841dd6Aff341b2d6e3abA433b',
        symbol: 'BAR',
        name: 'FC Barcelona Fan Token',
        decimals: 0,
        logoURI: '/fanTokens/fcb_token.png',
        chainId: 88888
    },
    {
        address: '0x454038003a93cf44766aF352F74bad6B745616D0',
        symbol: 'JUV',
        name: 'Juventus',
        decimals: 0,
        logoURI: '/fanTokens/juv_token.png',
        chainId: 88888
    },
    {
        address: '0x6401b29F40a02578Ae44241560625232A01B3F79',
        symbol: 'CITY',
        name: 'Manchester City',
        decimals: 0,
        logoURI: '/fanTokens/city_token.png',
        chainId: 88888
    },
    {
        address: '0xe9506F70be469d2369803Ccf41823713BAFe8154',
        symbol: 'ATM',
        name: 'Atlético Madrid',
        decimals: 0,
        logoURI: '/fanTokens/atm_token.png',
        chainId: 88888
    },
    {
        address: '0xF9C0F80a6c67b1B39bdDF00ecD57f2533ef5b688',
        symbol: 'ACM',
        name: 'AC Milan',
        decimals: 0,
        logoURI: '/fanTokens/acm_token.png',
        chainId: 88888
    },
    {
        address: '0xba0c26485b1909f80476067272d74A99Cc0E1D57',
        symbol: 'VCF',
        name: 'Valencia',
        decimals: 0,
        logoURI: '/fanTokens/vcf_token.png',
        chainId: 88888
    }
];

export const getTokensByChain = (chainId: number): Token[] => {
    return tokens.filter(token => token.chainId === chainId);
};