const Web3 = require('web3');

const web3 = new Web3(Web3.givenProvider || 'https://cloudflare-eth.com');

console.log("Web3 version: ", web3.version);
console.log("Web3 providers: ", web3.providers);
console.log("Web3 currentProvider: ", web3.currentProvider);
web3.eth.getNodeInfo(function (error, result) {
    console.log("Node Info: ", result)
});
web3.eth.getBlockNumber(function (error, result) {
    console.log("Block number: ", result)
});
web3.eth.getAccounts(function (error, result) {
    console.log("Accounts: ", result)
});
web3.eth.getBlock("earliest", false, function (error, result) {
    console.log("Earliest Block: ", result)
})
web3.eth.getBlock("latest", false, function (error, result) {
    console.log("Latest Block: ", result)
})
web3.eth.getBlock("pending", false, function (error, result) {
    console.log("Pending Block: ", result)
})
// const accounts = await ethereum.request({ method: 'eth_accounts' });
// accounts.then(console.log);
