import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { JsonRpcProvider, Wallet, parseEther } from 'ethers'; // Correct imports for v6
import { ethers } from 'ethers'; // Correct import for v6
import * as dotenv from "dotenv"; // ES6-style import
dotenv.config();

const url = `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
const provider = new JsonRpcProvider(url);

const settings = {
    apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
    //network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

// Replace with your private key and address (⚠️ Never commit private keys!)
const privateKey = process.env.PRIVATE_KEY; // Use dotenv to load your private key
const senderAddress = process.env.ADDRESS; // Use dotenv to load your address

async function sendTestETH() {
    try {
        const wallet = new Wallet(privateKey, provider);

        const tx = await wallet.sendTransaction({
            to: senderAddress,
            value: parseEther('0.001'),
            // Let Ethers.js handle gas automatically
        });

        console.log(`Transaction hash: ${tx.hash}`);
        console.log(`View on Etherscan: https://sepolia.etherscan.io/tx/${tx.hash}`);
    } catch (error) {
        console.error('Transaction failed:', error);
    }
}

async function getTxns() {

    const alchemy = new Alchemy(settings);

    const getLogs = await alchemy.core.getLogs({
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        topics: [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        ],
        blockHash:
            "0x49664d1de6b3915d7e6fa297ff4b3d1c5328b8ecf2ff0eefb912a4dc5f6ad4a0",
    });
    console.log(getLogs);
}



async function estimateGas() {
    // 1. Initialize provider
    const provider = new ethers.AlchemyProvider("sepolia", settings.apiKey);

    // 2. Get fee data (replaces getGasPrice)
    const feeData = await provider.getFeeData();

    // 3. Estimate gas
    const gasEstimate = await provider.estimateGas({
        to: "vitalik.eth",
        value: ethers.parseEther("1.0")
    });

    // 4. Calculate costs (using maxFeePerGas from EIP-1559)
    const gasCost = gasEstimate * feeData.maxFeePerGas;

    // 5. Format output
    console.log(`Gas Estimate: ${gasEstimate.toString()} units`);
    console.log(`Max Fee per Gas: ${ethers.formatUnits(feeData.maxFeePerGas, "gwei")} Gwei`);
    console.log(`Total Max Cost: ${ethers.formatUnits(gasCost, "ether")} ETH`);
}

//sendTestETH().catch(console.error); dont run this, it uses private key
estimateGas().catch(console.error);
getTxns().catch(console.error);  
