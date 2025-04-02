import axios from "axios";
import * as dotenv from "dotenv"; // ES6-style import
dotenv.config();

const url = `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
const payLoad = {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_blockNumber",
    params: []
};

axios.post(url, payLoad)
    .then((res) => {
        console.log('The latest block number is', parseInt(res.data.result, 16)); // Fixed variable name
    })
    .catch((err) => {
        console.log(err);
    });