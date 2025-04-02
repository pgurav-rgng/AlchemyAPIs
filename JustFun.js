console.log('Proof you’re a crypto dev:');
console.log([
    'You debug gas errors at 3 AM',
    'You think "WAGMI" is a life philosophy',
    'You’ve lost real funds to a typo in a contract address'
].join('\n- '));
const timestampHex = "0x67ed3b60";
const timestampDecimal = parseInt(timestampHex, 16);
const date = new Date(timestampDecimal * 1000); // Convert from seconds to milliseconds  
console.log(date.toISOString()); // Output in readable format (UTC)

const amountHex = "0x37c9e";
const amountGwei = parseInt(amountHex, 16); // Convert hex to decimal  
const amountETH = amountGwei / 1e9; // Convert Gwei to ETH  
console.log(amountETH + " ETH");  