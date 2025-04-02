import { Network, Alchemy } from 'alchemy-sdk';
import * as dotenv from "dotenv"; // ES6-style import
dotenv.config();

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
    apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
    //network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);


alchemy.core.getBalance(process.env.ADDRESS)
    .then((balance) => {
        // Convert Wei to ETH (1 ETH = 10^18 Wei)
        const ethBalance = balance / 1e18;
        console.log(`ETH Balance: ${ethBalance} ETH`);
    })
    .catch(console.error);
