import express from "express";
import dotenv from "dotenv";
import { parseEventLogs, getContract } from "viem";
import {
  baseClient,
  baseWalletClient,
  chilizClient,
  chilizWalletClient,
  pepperLockUnlockBridgeAddress,
  pepperMintBurnBridgeAddress,
  mintBurnBridgeAbi,
  lockUnlockBridgeAbi,
} from "./constants";

dotenv.config();

const app = express();
const port = 3000;

async function startRelayer() {
  console.log("🚀 Starting Pepper Relayer...");

  const baseStartBlock = (await baseClient.getBlockNumber()) - 5n;
  const chilizStartBlock = (await chilizClient.getBlockNumber()) - 5n;

  // 🔐 LOCKED (Base → Chiliz)
  console.log("👁️ Watching for Locked events on Base Sepolia...");
  baseClient.watchContractEvent({
    address: pepperLockUnlockBridgeAddress,
    abi: lockUnlockBridgeAbi,
    eventName: "Locked", // Only process Locked events
    onLogs: async (logs) => {
      for (const log of logs) {
        const parsed = parseEventLogs({
          abi: lockUnlockBridgeAbi,
          logs: [log],
        })[0];
        if (parsed && "eventName" in parsed && "args" in parsed) {
          const { user, amount, destinationChainId, nonce } = parsed.args as {
            user: string;
            amount: bigint;
            destinationChainId: bigint;
            nonce: bigint;
          };
          const lockTxHash = parsed.transactionHash;
          const blockNumber = log.blockNumber;
          const txHash = log.transactionHash;

          console.log(
            `📦 [LOCKED] ${user} locked ${amount} WETH → Minting pWETH... (block: ${blockNumber}, tx: ${txHash})`
          );

          try {
            const mintContract = getContract({
              address: pepperMintBurnBridgeAddress,
              abi: mintBurnBridgeAbi,
              client: chilizWalletClient,
            });

            if (mintContract.simulate?.mint) {
              const { request } = await mintContract.simulate.mint([
                user,
                amount,
                lockTxHash,
              ]);
              const txHash = await chilizWalletClient.writeContract(request);

              console.log(`✅ Minted pWETH on Chiliz: ${txHash}`);
            } else {
              console.error("❌ mintContract.simulate.mint is undefined");
            }
          } catch (err: any) {
            console.error("❌ Mint failed:", err.message || err);
          }
        } else {
          console.log("Unparsed log:", log);
        }
      }
    },
  });

  // 🔥 BURNED (Chiliz → Base)
  console.log("👁️ Watching for Burned events on Chiliz...");
  chilizClient.watchContractEvent({
    address: pepperMintBurnBridgeAddress,
    abi: mintBurnBridgeAbi,
    eventName: "Burned", // Only process Burned events
    onLogs: async (logs) => {
      for (const log of logs) {
        const parsed = parseEventLogs({
          abi: mintBurnBridgeAbi,
          logs: [log],
        })[0];
        if (parsed && "eventName" in parsed && "args" in parsed) {
          const { user, amount, destinationChainId, nonce } = parsed.args as {
            user: string;
            amount: bigint;
            destinationChainId: bigint;
            nonce: bigint;
          };
          const burnTxHash = parsed.transactionHash;
          const blockNumber = log.blockNumber;
          const txHash = log.transactionHash;

          console.log(
            `🔥 [BURNED] ${user} burned ${amount} pWETH → Unlocking WETH... (block: ${blockNumber}, tx: ${txHash})`
          );

          try {
            const unlockContract = getContract({
              address: pepperLockUnlockBridgeAddress,
              abi: lockUnlockBridgeAbi,
              client: baseWalletClient,
            });

            if (unlockContract.simulate?.unlock) {
              const { request } = await unlockContract.simulate.unlock([
                user,
                amount,
                burnTxHash,
              ]);
              const txHash = await baseWalletClient.writeContract(request);

              console.log(`✅ Unlocked WETH on Base: ${txHash}`);
            } else {
              console.error("❌ unlockContract.simulate.unlock is undefined");
            }
          } catch (err: any) {
            console.error("❌ Unlock failed:", err.message || err);
          }
        } else {
          console.log("Unparsed log:", log);
        }
      }
    },
  });
}

// 🔧 Start server
app.listen(port, () => {
  console.log(`🌐 Pepper Relayer running at http://localhost:${port}`);
  startRelayer(); // auto-start
});
