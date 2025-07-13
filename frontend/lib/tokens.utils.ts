import { Chain, Token } from "@/types/global";

export const chains: Chain[] = [
  {
    id: 1,
    name: "Ethereum",
    symbol: "ETH",
    logoURI: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
  },
  {
    id: 8453,
    name: "Base",
    symbol: "BASE",
    logoURI:
      "https://assets.coingecko.com/coins/images/55602/standard/Ticker_COIN__Company_Name_Coinbase__size_200x200_2x.png?1746858187",
  },
  {
    id: 88888,
    name: "Chiliz",
    symbol: "CHZ",
    logoURI: "https://assets.coingecko.com/coins/images/8834/thumb/Chiliz.png",
  },
];

export const tokens: Token[] = [
  // Base Sepolia WETH
  {
    address: "0x4200000000000000000000000000000000000006",
    symbol: "WETH",
    name: "Wrapped Ether",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/2518/thumb/weth.png",
    chainId: 84532, // Base Sepolia
  },
  // Chiliz Spicy pWETH
  {
    address: "0xD5626e2BfFf7d877F5a3D37eEF4A50aB62b2C152",
    symbol: "pWETH",
    name: "Pepper Wrapped Ether",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/2518/thumb/weth.png",
    chainId: 88882, // Chiliz Spicy
  },
];

export const getTokensByChain = (chainId: number): Token[] => {
  return tokens.filter((token) => token.chainId === chainId);
};
