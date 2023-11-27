import Web3 = require('web3');


const web3 = new Web3.default(Web3.default.givenProvider || 'https://cloudflare-eth.com');

web3.eth.getBlockNumber(function (error, result) {
    console.log(result)
});
web3.eth.getAccounts(function (error, result) {
    console.log
});
// const accounts = await ethereum.request({ method: 'eth_accounts' });
// accounts.then(console.log);
